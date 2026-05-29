/**
 * 本地构建产物 + SSH(SFTP) 上传到服务器（不依赖 rsync）
 * 配置：复制 .env.deploy.example 为 .env.deploy
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import { Client, type ConnectConfig } from 'ssh2'
import Zip from 'adm-zip'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)))

type DeployConfig = ConnectConfig & {
    host: string
    port: number
    username: string
    password: string
}

/** 解析 .env.deploy 中的 SSH 连接配置 */
function loadDeployConfig(envPath: string): DeployConfig {
    if (!existsSync(envPath)) {
        throw new Error(`${envPath} 不存在，请复制 .env.deploy.example 为 .env.deploy`)
    }

    const vars: Record<string, string> = {}
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#'))
            continue

        const eq = trimmed.indexOf('=')
        if (eq === -1)
            continue

        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
        vars[key] = value
    }

    const host = vars.DEPLOY_HOST
    const username = vars.DEPLOY_USERNAME
    const password = vars.DEPLOY_PASSWORD
    const port = Number(vars.DEPLOY_PORT ?? '22')

    if (!host || !username || !password) {
        throw new Error('.env.deploy 缺少 DEPLOY_HOST / DEPLOY_USERNAME / DEPLOY_PASSWORD')
    }

    return { host, port, username, password }
}

function connectSsh(config: DeployConfig): Promise<Client> {
    return new Promise((resolve, reject) => {
        const conn = new Client()
        conn.on('ready', () => resolve(conn))
        conn.on('error', reject)
        conn.connect(config)
    })
}

/** 执行远程 shell 命令，非 0 退出码会 reject */
function runRemoteCommand(conn: Client, command: string): Promise<{ stdout: string, stderr: string }> {
    return new Promise((resolve, reject) => {
        conn.exec(command, (err, stream) => {
            if (err) {
                reject(err)
                return
            }

            let stdout = ''
            let stderr = ''

            stream.on('close', (code) => {
                if (code === 0) {
                    resolve({ stdout, stderr })
                    return
                }
                reject(new Error(`命令执行失败 (exit ${code}): ${stderr || stdout}`))
            })
            stream.on('data', (data: Buffer) => {
                stdout += data.toString()
            })
            stream.stderr.on('data', (data: Buffer) => {
                stderr += data.toString()
            })
        })
    })
}

/** SFTP 上传 buffer，可选进度回调 */
function uploadBuffer(
    conn: Client,
    remotePath: string,
    buffer: Buffer,
    onProgress?: (percent: number) => void,
): Promise<void> {
    return new Promise((resolve, reject) => {
        conn.sftp((err, sftp) => {
            if (err) {
                reject(err)
                return
            }

            const writeStream = sftp.createWriteStream(remotePath)
            const readStream = Readable.from(buffer)
            let bytesWritten = 0
            const totalSize = buffer.length

            writeStream.on('error', reject)
            readStream.on('error', reject)
            writeStream.on('close', () => resolve())

            readStream.on('data', (chunk: Buffer) => {
                bytesWritten += chunk.length
                onProgress?.((bytesWritten / totalSize) * 100)
            })

            readStream.pipe(writeStream)
        })
    })
}

async function main() {
    const config = loadDeployConfig(path.join(projectRoot, '.env.deploy'))
    const localDir = path.join(projectRoot, '.output/public')

    if (!existsSync(localDir)) {
        throw new Error(`${localDir} 不存在，请先执行 pnpm generate 或 pnpm build`)
    }

    const zip = new Zip()
    zip.addLocalFolder(localDir, '')
    const zipBuffer = zip.toBuffer()

    console.log('正在连接服务器...')
    const conn = await connectSsh(config)

    try {
        console.log('连接成功')

        await uploadBuffer(conn, '/var/www/dist.zip', zipBuffer, (percent) => {
            process.stdout.write(`\x1B[34m文件上传中：${percent.toFixed(2)}%\x1B[0m \r`)
        })
        process.stdout.write('\n')
        console.log('文件上传完成，正在解压...')

        await runRemoteCommand(
            conn,
            'rm -rf /var/www/html && mkdir -p /var/www/html && cd /var/www && unzip -o ./dist.zip -d /var/www/html && rm -f ./dist.zip',
        )

        console.log('\x1B[34m%s\x1B[0m', '解压完毕！')
        console.log('\x1B[32m%s\x1B[0m', '部署完成！')
    }
    finally {
        conn.end()
    }
}

main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error('\x1B[31m部署失败：\x1B[0m', message)
    process.exit(1)
})

import { Client } from 'ssh2'
import { servers } from '../servers/index'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const password = 'xxxxxx'

const buildNginxConfig = (siteName: string) => {
    const templatePath = path.join(process.cwd(), 'nginx.conf')
    const template = readFileSync(templatePath, 'utf8')
    return template.replace(/www\.xxxSiteName\.com/g, siteName)
    .replace(/\bxxxSiteName\.com\b/g, siteName)
}

const runRemoteCommand = (conn: Client, command: string) => {
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
                } else {
                    reject(new Error(`命令执行失败 (exit ${code}): ${stderr || stdout}`))
                }
            })
            stream.on('data', (data: any) => {
                stdout += data.toString()
            })
            stream.stderr.on('data', (data: any) => {
                stderr += data.toString()
            })
        })
    })
}

const remoteCheck = async (conn: Client, command: string) => {
    try {
        await runRemoteCommand(conn, command)
        return true
    } catch (error) {
        return false
    }
}

// 上传文本到远程服务器
function uploadText(conn: Client, remotePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      conn.sftp((err, sftp) => {
        if (err) {
          reject(err)
          return
        }
  
        const stream = sftp.createWriteStream(remotePath, { encoding: 'utf8' })
        stream.on('error', reject)
        stream.on('close', () => resolve())
        stream.end(content)
      })
    })
  }

function initServer(siteName: string, ip: string) {
    const conn = new Client()
    return new Promise((resolve, reject) => {
        conn.on('ready', async () => {
            console.log(`${siteName} 连接成功`)
            console.log('开始初始化服务器...');
            await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt update')
            const hasIptablesSave = await remoteCheck(conn, 'command -v iptables-save >/dev/null 2>&1')
            if (hasIptablesSave) {
                console.log('iptables-save 已安装')
            } else {
                console.log('iptables-save 未安装')
                await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y iptables-save')
            }
            const nginxInstalled = await remoteCheck(conn, 'dpkg -s nginx >/dev/null 2>&1')
            const curlInstalled = await remoteCheck(conn, 'dpkg -s curl >/dev/null 2>&1')
            if (nginxInstalled && curlInstalled) {
                console.log('nginx/curl 已安装')
            } else {
                console.log('nginx/curl 未安装')
                await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y nginx curl')
            }

            const nginxEnabled = await remoteCheck(conn, 'systemctl is-enabled --quiet nginx')
            const nginxActive = await remoteCheck(conn, 'systemctl is-active --quiet nginx')
            if (nginxEnabled && nginxActive) {
                console.log('nginx 已启用且运行中，跳过启动')
            } else {
                console.log('nginx 未启用或运行中')
                await runRemoteCommand(conn, 'systemctl enable nginx && systemctl restart nginx')
            }
            const ngnixconfig = buildNginxConfig(siteName)
            // 只校验 nginx 对 HTTP 请求有响应，避免 403/404 被误判为失败
            await runRemoteCommand(conn, 'systemctl is-active --quiet nginx')
            await runRemoteCommand(conn, "code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 http://127.0.0.1 || true); [ \"$code\" != \"000\" ]")
            console.log('default 配置是否已是目标内容...')

            const tempConfigPath = `/tmp/${siteName.replace(/[^a-zA-Z0-9.-]/g, '_')}-default.conf`

            await uploadText(conn, tempConfigPath, ngnixconfig)
            const defaultConfigSame = await remoteCheck(conn, `test -f /etc/nginx/sites-enabled/default && cmp -s /etc/nginx/sites-enabled/default ${tempConfigPath}`)
            if (defaultConfigSame) {
                console.log('default 配置已是最新内容')
                await runRemoteCommand(conn, `rm -f ${tempConfigPath}`)
            } else {
                console.log('default 配置未是最新内容')
                await runRemoteCommand(conn, [
                    'mkdir -p /etc/nginx/sites-enabled',
                    'mkdir -p /etc/nginx/backup',
                    '[ -f /etc/nginx/sites-enabled/default ] && cp /etc/nginx/sites-enabled/default /etc/nginx/backup/default.bak || true',
                    `mv ${tempConfigPath} /etc/nginx/sites-enabled/default`,
                ].join(' && '))
            }
            await runRemoteCommand(conn, "rm -f /etc/nginx/sites-enabled/*.bak")
            await runRemoteCommand(conn, 'nginx -t')
            await runRemoteCommand(conn, 'systemctl reload nginx')
            console.log('服务器初始化完成')
            resolve(true)
            conn.end()
        })
        conn.on('error', (err) => {
            reject(err)
        })
        conn.connect({
            host: ip,
            port: 22,
            username: 'root',
            password: password
        })
    })
}

const main = async (siteName: string, ip: string) => {
    initServer(siteName, ip)
}

const argv = process.argv.slice(2)
const siteName = argv[0]
const server = servers.find(server => server.name === siteName)
if (!server) {
    console.error(`服务器 ${siteName} 不存在`)
    process.exit(1)
}

main(siteName, server.ip)
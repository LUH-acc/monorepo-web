import { Client } from 'ssh2'
import { readFileSync } from 'fs'
import path from 'node:path'

const serverConfig = {
    'xxxSiteName': '192.168.1.1'
}

const password = '123456'

function parseArgs = (argv) => {
    const args = [...argv]
    return {
        siteNames: args
    }
}

function buildNginxConfig(siteName: string, ip: string) {
    const templatePath = path.join(process.cwd(), 'nginx.conf')
    const template = readFileSync(templatePath, 'utf8')
    return template.replace(/www\.chuankeji\.com/g, siteName)
    .replace(/\bchuankeji\.com\b/g, siteName)
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
// 检查远程命令是否执行成功
async function remoteCheck(conn: Client, command: string) {
    try {
        await runRemoteCommand(conn, command)
        return true
    } catch (error) {
        return false
    }

}
// 执行远程命令
function runRemoteCommand(conn: Client, command: string) {
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
            stream.on('data', (data: Buffer) => {
                stdout += data.toString()
            })
            stream.stderr.on('data', (data: Buffer) => {
                stderr += data.toString()
            })
        })
    })
}

async function initServer(siteName: string, ip: string) {
    const ngnixconfig = buildNginxConfig(siteName, ip)
    const conn = new Client()
    const connect = {
        host: ip,
        port: 22,
        username: 'root',
        password: password
    }
    return new Promise((resolve, reject) => {
        conn.on('ready', async () => {
            try {
                console.log(`\x1B[36m[${siteName}]\x1B[0m 1/7 更新 apt 索引...`)
                await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt update')
                const hasIptablesSave = await remoteCheck(conn, 'command -v iptables-save >/dev/null 2>&1')
                if (hasIptablesSave) {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 2/7 iptables-save 已安装`)
                } else {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 2/7 iptables-save 未安装`)
                    await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y iptables-save')
                }
                console.log(`\x1B[36m[${siteName}]\x1B[0m 3/7 检查 nginx/curl 是否已安装...`)
                const nginxInstalled = await remoteCheck(conn, 'dpkg -s nginx >/dev/null 2>&1')
                const curlInstalled = await remoteCheck(conn, 'dpkg -s curl >/dev/null 2>&1')

                if (nginxInstalled && curlInstalled) {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 4/7 nginx/curl 已安装`)
                } else {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 4/7 nginx/curl 未安装`)
                    await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y nginx curl')
                }

                console.log(`\x1B[36m[${siteName}]\x1B[0m 4/7 检查 nginx 服务状态...`)
                const nginxEnabled = await remoteCheck(conn, 'systemctl is-enabled --quiet nginx')
                const nginxActive = await remoteCheck(conn, 'systemctl is-active --quiet nginx')
                if (nginxEnabled && nginxActive) {
                    console.log(`\x1B[33m[${siteName}]\x1B[0m nginx 已启用且运行中，跳过启动`)
                  } else {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 启动并设置开机自启...`)
                    await runRemoteCommand(conn, 'systemctl enable nginx && systemctl restart nginx')
                }
                console.log(`\x1B[36m[${siteName}]\x1B[0m 5/7 检查 nginx 是否成功启动...`)
                await runRemoteCommand(conn, 'systemctl is-active --quiet nginx')
                // 只校验 nginx 对 HTTP 请求有响应，避免 403/404 被误判为失败
                await runRemoteCommand(
                    conn,
                    "code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 http://127.0.0.1 || true); [ \"$code\" != \"000\" ]",
                )
                console.log(`\x1B[36m[${siteName}]\x1B[0m 6/7 检查 default 配置是否已是目标内容...`)
                const tempConfigPath = `/tmp/${siteName.replace(/[^a-zA-Z0-9.-]/g, '_')}-default.conf`

                await uploadText(conn, tempConfigPath, nginxConfig)
                const defaultConfigSame = await remoteCheck(
                    conn,
                    `test -f /etc/nginx/sites-enabled/default && cmp -s /etc/nginx/sites-enabled/default ${tempConfigPath}`,
                  )
                  if (defaultConfigSame) {
                    console.log(`\x1B[33m[${siteName}]\x1B[0m default 配置已是最新内容`)
                    await runRemoteCommand(conn, `rm -f ${tempConfigPath}`)
                  } else {
                    console.log(`\x1B[36m[${siteName}]\x1B[0m 更新 default 配置...`)
                    await runRemoteCommand(
                        conn,
                        [
                          'mkdir -p /etc/nginx/sites-enabled',
                          'mkdir -p /etc/nginx/backup',
                          '[ -f /etc/nginx/sites-enabled/default ] && cp /etc/nginx/sites-enabled/default /etc/nginx/backup/default.bak || true',
                          `mv ${tempConfigPath} /etc/nginx/sites-enabled/default`,
                        ].join(' && '),
                      )
                  }
                  console.log(`\x1B[36m[${siteName}]\x1B[0m 7/7 校验并重载 nginx...`)
                  await runRemoteCommand(conn, "rm -f /etc/nginx/sites-enabled/*.bak")
                  await runRemoteCommand(conn, 'nginx -t')
                  await runRemoteCommand(conn, 'systemctl reload nginx')
                  console.log(`\x1B[32m[${siteName}]\x1B[0m 初始化完成`)
                  conn.end()
                  resolve(true)
            } catch (err) {
                const msg = error?.message || String(error)
                console.log(`\x1B[31m[${siteName}]\x1B[0m 初始化失败：${msg}`)
                conn.end()
                reject(new Error(msg))
            }

        }).on('error', (err) => {
            reject(err)
        }).connect(connect)
    })
}
async function main(argv: string[]) {
    const { siteNames } = parseArgs(argv)
    console.log(`\x1B[36m准备初始化 ${siteNames.length} 台服务器...\x1B[0m\n`)
    await initServer(siteNames[0], serverConfig[siteNames[0]])
    console.log(`\x1B[32m[${siteNames[0]}]\x1B[0m 初始化完成`)
}
const argv = process.argv.slice(2)
main(argv).catch(
    (error) => {
        console.error(error)
        process.exit(1)
    }
)
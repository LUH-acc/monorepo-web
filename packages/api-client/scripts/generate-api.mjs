import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** 覆盖默认文档地址：AI_TOKEN_OPENAPI_URL=http://127.0.0.1:8010/openapi.json pnpm generate */
const specUrl =
  process.env.AI_TOKEN_OPENAPI_URL?.trim() ||
  'http://45.32.108.182:8010/openapi.json'

const args = [
  'exec',
  'swagger-typescript-api',
  'generate',
  '-p',
  specUrl,
  '-o',
  './src/generated',
  '--modular',
  '--extract-enums',
  '--extract-request-params',
  '--extract-response-body',
  '--single-http-client',
  '--clean-output',
]

const result = spawnSync('pnpm', args, {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}
process.exit(result.status ?? 1)

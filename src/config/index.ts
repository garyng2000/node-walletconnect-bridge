const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'
//const port = process.env.PORT || (env === 'production' ? 8000 : 8001)
const port = (env === 'production' ? 8000 : 8001)
const host = process.env.LISTEN || `0.0.0.0:${port}`

const redis = {
  url: process.env.REDIS_URL || 'redis://localhost:6379/0',
  prefix: process.env.REDIS_PREFIX || 'walletconnect-bridge'
}

export default {
  env: env,
  debug: debug,
  port,
  host,
  redis
}

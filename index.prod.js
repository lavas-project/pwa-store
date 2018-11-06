/**
 * @file 生产环境主入口
 * @deprecated 暂时好像和开发入口一样，之后再看
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const Koa = require('koa')
const Router = require('koa-router')
const glob = require('glob')

const {PORT} = require('./config/server')
const getRouterPath = require('./utils/getRouterPath')
const log = require('./utils/log')

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  log.info(ctx.url)
  await next()
})

registerRoutes().then(() => {
  app.use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT)

  log.info('服务器启动于端口号', PORT, '\n\n')
}, () => {
  log.error('服务器启动失败\n\n')
})

async function registerRoutes () {
  return new Promise((resolve, reject) => {
    glob("actions/**/*.js", (err, files) => {
      if (err) {
        log.error('读取 actions 失败')
        log.error(err)
        reject()
        return
      }

      files.forEach(actionPath => {
        let action = require(`./${actionPath}`)
        if (typeof action.handler !== 'function') {
          log.warn(actionPath, '不是一个合法的 action，已经跳过')
          return
        }
        if (!action.routerPath) {
          action.routerPath = getRouterPath(actionPath)
        }
        router.get(action.routerPath, action.handler)
      })

      resolve()
    })
  })
}
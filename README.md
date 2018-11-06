# PWA Store

## 调研分工

- [ ] mysql (@craigchencc)
- [ ] baidu passport (@liuruoran88)
- [ ] init project (@easonyq)

## 功能分工

TODO

## node 端开发手册

node 端负责提供 API 服务，因此主体由 actions 组成，一个 action 对应一条路由规则和一个处理函数，全部位于 `actions` 目录中。

在 `actions/example.js` 给出了示例，一个 action 需要通过 `module.exports` 暴露两个属性：

* `routerPath`

    默认情况，会根据 action 所在的目录自动生成访问路由。例如 `actions/example.js` 会生成 `/api/example`。如果需要自定义，就需要使用 `routerPath` 字段进行重写，例如路由参数 `routerPath: '/api/example/:operation'`。

    重写时，**必须** 把 `/api` 写在最前面，因为我们约定所有后端接口都由这个开头，否则会和 Vue 部分混淆起来。

* `handler`

    处理函数本身，参数和 koa 的传统中间件相同，为 `ctx` 和 `next`。通常使用 `ctx` 去获取各类东西，比如头信息，参数信息，并设置响应。`next` 常规应该极少用到。

    具体的使用方法在 `actions/example.js` 里面有，再就是查看 koa 文档了。

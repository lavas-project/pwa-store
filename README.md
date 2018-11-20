# PWA Store

## 调研分工

- [ ] mysql (@craigchencc)
- [ ] baidu passport (@liuruoran88)
- [x] init project (@easonyq)
- [ ] radar (@easonyq)

## 功能分工

TODO

## 需求列表

- [ ] 首页（可包含最新列表，最好评列表，分类列表等，使用 cover 图）（高）
    - [ ] 底栏：首页，列表（子TAB各类列表），上传，关于（PWA和PWA Store）
- [ ] 分类列表页（按类型分，包含icon，名称，作者，一句话介绍）（高）
- [ ] 最新列表页（按收录时间排序）（高）
- [ ] 最好评列表页（按评价排序）（中）
- [ ] 站点详情页（名称，图片 icon & screenshots，作者，跳走链接，radar评估信息）（高）
    - [ ] 评价功能（中）
    - [ ] 评论功能（低）
- [ ] 编辑站点信息页（信息和详情页类似，参考DB设计）（高）
    - [ ] 上传（高）
    - [ ] 修改（高）
    - [ ] 刷新 radar 分数（高）
- [ ] PWA 介绍页（可包含 Lavas 官网链接，PWA 课程链接等）（高）
- [ ] PWA Store 介绍页（可包含本站点的目的，如何上传，radar评分是怎么做的，如何联系我们）（高）
- [ ] 自身的 PWA （manifest & SW）（高）
- [ ] 抓取站点信息并录入（中）
- [ ] 评论的筛选。可以做成一个页面列出所有的评论，也可以纯粹DB端命令完成，还可以增加评论的延迟显示&人工筛选等（低）

## 命令

`npm run dev` - 启动开发服务器，端口 8080 （可修改）。包含 Vue 和 nodejs 两端，均支持热加载。

`npm run build` - 构建压缩 Vue 代码，会生成到 `/vue-dist` 目录。nodejs 端不做改变。

`npm run start` - 启动生产服务器，必须在构建后执行，因为会读取 `/vue-dist` 作为前端代码。

## node 端开发手册

### actions

node 端负责提供 API 服务，因此主体由 actions 组成，一个 action 对应一条路由规则和一个处理函数，全部位于 `actions` 目录中。

在 `actions/example.js` 给出了示例，一个 action 需要通过 `module.exports` 暴露两个属性：

* `routerPath`

    默认情况，会根据 action 所在的目录自动生成访问路由。例如 `actions/example.js` 会生成 `/api/example`。如果需要自定义，就需要使用 `routerPath` 字段进行重写，例如路由参数 `routerPath: '/api/example/:operation'`。

    重写时，**必须** 把 `/api` 写在最前面，因为我们约定所有后端接口都由这个开头，否则会和 Vue 部分混淆起来。

* `handler`

    处理函数本身，参数和 koa 的传统中间件相同，为 `ctx` 和 `next`。通常使用 `ctx` 去获取各类东西，比如头信息，参数信息，并设置响应。`next` 常规应该极少用到。

    具体的使用方法在 `actions/example.js` 里面有，再就是查看 koa 文档了。

### middlewares

除了 actions 之外，node 端还提供了中间件的机制，主要是为了处理例如“验证登录状态”这样的每个请求都要做的事情。

middlewares 写法和 actions 类似，在 `middlewares/example.js` 给出了示例。

* 没有 `routerPath`，因为中间件适用于所有路由

* 直接返回 function，相当于 action 的 `handler`，参数也是 `ctx` 和 `next`

* `handler` 写法和 action 差不多，通过 `ctx` 获取各类信息。不同的是，除了使用 `ctx.body=` 来截断路由直接返回（例如发现登录信息无效，直接去错误页面或错误提示），也可以使用 `await next()` 继续往下走到路由中（例如登录信息有效，设置一个变量挂在 `ctx` 上供后面使用）。

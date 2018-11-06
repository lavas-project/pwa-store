/**
 * @file 把 actions 路径转化为自动路由
 * @author wangyisheng@baidu.com (wangyisheng)
 */

/**
 * 把 actions 路径转化为自动路由
 *
 * @param {string} actionPath 'action/example.js'
 * @returns {string} '/api/example'
 */
module.exports = actionPath => {
  let paths = actionPath.split('/')
  paths[0] = 'api'
  paths[paths.length - 1] = paths[paths.length - 1].replace(/\.js$/i, '')
  return `/${paths.join('/')}`
}

/**
 * @file 带颜色的日志打印
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const chalk = require('chalk')
const log = console.log

module.exports = {
  info () {
    log(chalk.green('[Info]'), ...arguments)
  },

  warn () {
    log(chalk.yellow('[Warn]'), ...arguments)
  },

  error () {
    log(chalk.red('[Error]'), ...arguments)
  }
}

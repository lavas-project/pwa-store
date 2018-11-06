/**
 * @file 把 glob 原生的回调方式转化为 promise
 * @deprecated 暂时没在用，之后也确认没用的话就删掉
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const glob = require('glob')

module.exports = (pattern, options) => {
  return new Promise((resolve, reject) => {
    glob (pattern, options, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

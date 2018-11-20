/**
 * @file sequelize orm
 * @author mj(zoumiaojiang@gmail.com)
 */

'use strict'

const Sequelize = require('sequelize')
const config = require('../config/mysql')

let options = Object.assign({}, config.db, config.options)

const sequelize = new Sequelize(options.database, options.user, options.password, {
  host: options.host,
  dialect: options.dialect,
  // this is something about security
  operatorsAliases: false,
  // dialectOptions: {
  //   socketPath: "/var/run/mysqld/mysqld.sock"
  // },
  pool: {
    max: options.queueLimit,
    min: options.min,
    idle: options.idle,
    acquire: 30000
  }
})
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

// 本来想学一些教程上对 define 做一层封装，以固定表格的一些内容，如 id、createAt 和 timestamp 等，但似乎不一定需要，就先这样留有余地吧。
let db =  {
  query: sequelize.query.bind(sequelize),
  define: sequelize.define.bind(sequelize),
  sync: () => {
    // 直接创建表结构，方便测试
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: true })
    } else {
      throw new Error(`Cannot sync() when NODE_ENV is set to 'production'.`)
    }
  }
}
for (const type of TYPES) {
  db[type] = Sequelize[type]
}

module.exports = db

const db = require('../utils/db')

module.exports = db.define('pwa_store', {
  id: {
    type: db.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: db.STRING(100),
  introduction: db.STRING(255),
  description: db.TEXT,
  type: db.STRING(50),
  // 链接长度暂时设置为默认值 255，感觉字符长了就可能会是一个坑。
  url: {
    type: db.STRING(255),
    validate: {
      isUrl: true,
      allowNull: false
    }
  },
  author_id: db.STRING(50),
  author_name: db.STRING(50),
  // icon 也是一个链接
  icon: {
    type: db.STRING(255),
    validate: {
      isUrl: true
    }
  },
  // 封面图，区别于 icon 的小图，这是大一点的封面介绍图
  cover: {
    type: db.STRING(255),
    validate: {
      isUrl: true
    }
  },
  // pwa 应用的界面截图，type: string[] ，一般为 3 个界面截图的 URL。
  screenshots: db.TEXT,
  // Radar--master.baidu.com 审核结果返回的数据一般是 `{pwa: {score: 100}, perfomance: {score: 100}}`，也就是一个分数而已
  radar_info: db.STRING(255)
})

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.export = {
  outputDir: 'dist',
  lintOnSave: true,
  devServer: {
    proxy: {
      '/staff-backend': {
        target: 'http://dev-goods.ibook.tech',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
  },
  indexPath: '../dist/index.html',
  // 部署生产环境可开发环境的URL，默认情况下，VUE CLI 会假设你的应用会被部署到一个域名的根路径上
  publicPath: process.env.NODE_ENV === 'production' ? '/staff/' : '/'
}
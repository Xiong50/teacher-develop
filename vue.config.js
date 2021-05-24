module.exports = {
  // 跨域设置
  devServer: {
    port: 8082, // 端口号，如果端口号被占用，会自动提升1
    host: '0.0.0.0', // 主机名: 127.0.0.1，真机: 0.0.0.0
    https: false, // 协议
    hot: true, // 热更新
    open: true, // 启动服务时自动打开浏览器访问
    disableHostCheck: true, // 跳过检查
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      // 开发环境代理配置
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, // 开启代理服务器，
        pathRewrite: {
          // 将 请求地址前缀 /dev-api 替换为 空的，
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  // 打包时去除掉.map文件
  productionSourceMap: false,
  // 设置网页title
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '学校评价'
        return args
      })
    // 添加分析工具
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      // 移除prefetch插件，prefetch(预先加载模块)，关闭预先加载
      config.plugins.delete('prefetch')
    }
  },
  publicPath: '/'
}

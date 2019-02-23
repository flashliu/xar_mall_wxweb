var args = process.argv.slice(3)[0];
if (!args) {
  throw new Error('> 温馨提示：项目入口不能为空 ')
}
module.exports = {
  publicPath: '/used_car/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.ynxar.com/', //测试服务器
        pathRewrite: {
          '^/api': ''
        } //刘杰服务器
      },
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}

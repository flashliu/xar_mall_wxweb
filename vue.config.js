module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'https://api.ynxar.com/', //测试服务器
				pathRewrite: {
					'^/api': ''
				}
				// target: 'http://xar.ynxar.com/' //正式服务器
				// target: 'http://www.madmin.com/' //刘杰服务器
			},
		}
	}
}
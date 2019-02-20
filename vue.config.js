var args = process.argv.slice(3)[0];
if (!args) {
	throw new Error('> 温馨提示：项目入口不能为空 ')
}
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
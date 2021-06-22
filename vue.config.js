const path = require("path")
module.exports = {
	publicPath: '/adminTemplate/',
	productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
	assetsDir: 'static',
	devServer: {
		host: '0.0.0.0',
		port: 8989, // 端口
		disableHostCheck: true,
		https: false,
		open: true
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'MVI ADMIN TEMPLATE'
				return args
			})
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname,'./src/assets/css/config.less')
			]
		}
	},
}

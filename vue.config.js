module.exports = {
	publicPath: process.env.BASE_URL, // 部署应用包时的基本URL。
	devServer: {
		port: 8080,
		open: false, // 运行后自动浏览项目
		// 代理 (https://github.com/chimurai/http-proxy-middleware#proxycontext-config)
		proxy: {
			[process.env.VUE_APP_PROXY]: {
				target: process.env.VUE_APP_HTTP,
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					[`^${process.env.VUE_APP_PROXY}`]: "",
				},
			},
		},
	},
	chainWebpack: config => {
		// 修改插件选项
		config.plugin("html").tap(args => {
			args[0].title = "antd-web"; // 浏览器tab标题
			return args;
		});
	},
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					javascriptEnabled: true,
				},
			},
		},
	},
};

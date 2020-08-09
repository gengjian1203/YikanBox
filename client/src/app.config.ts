export default {
	pages: [
		'pages/loading/index', // 入口页面
	],
	subpackages: [
		{
			root: 'pages/demo', // 测试页
			pages: ['index'],
		},
		{
			root: 'pages/login', // 统一登录页
			pages: ['index'],
		},
		{
			root: 'pages/main', // 首页
			pages: ['index'],
		},
	],
	preloadRule: {
		'pages/loading/index': {
			network: 'all',
			packages: ['pages/main', 'pages/login'],
		},
	},
	window: {
		navigationStyle: 'custom', // 关掉微信顶部导航
		backgroundTextStyle: 'dark', // 'light'-浅色风格 'dark'-深色风格
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black',
		onReachBottomDistance: 200, // 触发上拉刷新
		enablePullDownRefresh: false, // 开启下拉刷新
	},
}

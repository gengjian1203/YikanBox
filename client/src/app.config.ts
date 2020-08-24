export default {
	pages: [
		'pages/loading/index', // 入口页面
	],
	subpackages: [
		{
			root: 'pages/article-detail', // 文章详情页
			pages: ['index'],
		},
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
		{
			root: 'pages/mine', // 我的页面子页面
			pages: [
				'achievement/index', // 我的成就
				'collection/index', // 我的收藏
				'popularize/index', // 我的推广
			],
		},
	],
	preloadRule: {
		// 加载页预加载：主页和登录页
		'pages/loading/index': {
			network: 'all',
			packages: ['pages/main', 'pages/login'],
		},
		// 主页预加载：文章详情子包、我的页面子包
		'pages/main/index': {
			network: 'all',
			packages: ['pages/article-detail', 'pages/mine'],
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

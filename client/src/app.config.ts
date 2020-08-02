export default {
	pages: [
		'pages/loading/index', // 入口页面
		'pages/demo/index',
		'pages/main/index', // 首页
	],
	window: {
		navigationStyle: 'custom', // 关掉微信顶部导航
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black',
		onReachBottomDistance: 200, // 触发上拉刷新
		enablePullDownRefresh: true, // 开启下拉刷新
	},
}

export default {
	pages: [
		'pages/loading/index', // 入口页面
	],
	subpackages: [
		{
			root: 'pages/article-detail',
			pages: [
				'index', // 文章详情页
			],
		},
		{
			root: 'pages/avatar-show',
			pages: [
				'index', // 头像秀页面
			],
		},
		{
			root: 'pages/blind-box',
			pages: [
				'box-open/index', // 打开盒子
				'box-select/index', // 选择盒子
				'hall-room/index', // 盲盒大厅
			],
		},
		{
			root: 'pages/demo',
			pages: [
				'index', // 测试页
			],
		},
		{
			root: 'pages/login',
			pages: [
				'index', // 统一登录页
			],
		},
		{
			root: 'pages/main',
			pages: [
				'index', // 首页
			],
		},
		{
			root: 'pages/mine', // 我的页面子页面
			pages: [
				'about/index', // 关于我们
				'achievement/index', // 我的成就
				'admin/index', // 我的管理
				'collection/index', // 我的收藏
				'popularize/index', // 我的邀请
			],
		},
		{
			root: 'pages/personality-detail',
			pages: [
				'index', // 个性秀
			],
		},
	],
	preloadRule: {
		// 加载页预加载：主页子包、登录页子包、
		'pages/loading/index': {
			network: 'all',
			packages: ['pages/main', 'pages/login'],
		},
		// 主页预加载：文章详情子包、我的页面子包、头像秀页面子包
		'pages/main/index': {
			network: 'all',
			packages: ['pages/article-detail', 'pages/mine', 'pages/avatar-show'],
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

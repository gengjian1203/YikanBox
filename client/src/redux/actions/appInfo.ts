import {
	SET_APP_INFO,
	SET_IS_IOS,
	SET_IS_IPHONEX,
	SET_HEIGHT_NAVIGATION,
	SET_HEIGHT_NAVIGATION_HEADER,
	SET_HEIGHT_TABBAR,
	SET_HEIGHT_TABBAR_BOTTOM,
	SET_BOTTOM_BAR_SELECT,
} from '@/redux/constants/appInfo'

const appInfoActions = dispatch => {
	const actions = {
		// 设置appInfo数据
		setAppInfo: payload => {
			dispatch({
				type: SET_APP_INFO,
				payload,
			})
		},
		// 设置是否是iOS机型
		setIsIOS: payload => {
			dispatch({
				type: SET_IS_IOS,
				payload,
			})
		},
		// 设置是否是类X机型
		setIsIphoneX: payload => {
			dispatch({
				type: SET_IS_IPHONEX,
				payload,
			})
		},
		// 设置顶部导航的高度
		setHeightNavigation: payload => {
			dispatch({
				type: SET_HEIGHT_NAVIGATION,
				payload,
			})
		},
		// 设置顶部导航整体的高度
		setHeightNavigationHeader: payload => {
			dispatch({
				type: SET_HEIGHT_NAVIGATION_HEADER,
				payload,
			})
		},
		// 设置底部导航的高度
		setHeightTabbar: payload => {
			dispatch({
				type: SET_HEIGHT_TABBAR,
				payload,
			})
		},
		// 设置底部导航整体的高度
		setHeightTabbarBottom: payload => {
			dispatch({
				type: SET_HEIGHT_TABBAR_BOTTOM,
				payload,
			})
		},
		// 设置底部导航索引值
		setBottomBarSelect: payload => {
			dispatch({
				type: SET_BOTTOM_BAR_SELECT,
				payload,
			})
		},
	}
	return actions
}

export default appInfoActions

import {
	SET_MAIN_PATH,
	SET_BOTTOM_BAR_LIST,
	SET_BOTTOM_BAR_SELECT,
} from '@/redux/constants/appInfo'

const appInfoActions = dispatch => {
	const actions = {
		// 设置首页路径
		setMainPath: payload => {
			dispatch({
				type: SET_MAIN_PATH,
				payload,
			})
		},
		// 设置底部导航列表
		setBottomBarList: payload => {
			dispatch({
				type: SET_BOTTOM_BAR_LIST,
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

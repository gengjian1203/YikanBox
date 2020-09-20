import {
	INIT_AVATAR_INFO,
	SET_AVATAR_SHOW_LIST_POINT,
	SET_AVATAR_IMAGE,
	SET_SELECT_TYPE,
	SET_SELECT_JEWELRY,
	ADD_AVATAR_JEWELRY,
	REMOVE_AVATAR_JEWELRY,
	UPDATE_AVATAR_JEWELRY,
} from '@/redux/constants/avatarShowInfo'

const avatarShowInfoActions = dispatch => {
	const actions = {
		// 初始化头像秀的信息
		initAvatarInfo: payload => {
			dispatch({
				type: INIT_AVATAR_INFO,
				payload,
			})
		},
		// 设置操作记录指针
		setAvatarShowListPoint: payload => {
			dispatch({
				type: SET_AVATAR_SHOW_LIST_POINT,
				payload,
			})
		},
		// 设置头像秀的背景图片
		setAvatarImage: payload => {
			dispatch({
				type: SET_AVATAR_IMAGE,
				payload,
			})
		},
		// 设置操作的类型
		setSelectType: payload => {
			dispatch({
				type: SET_SELECT_TYPE,
				payload,
			})
		},
		// 设置选中的饰品信息
		setSelectJewelry: payload => {
			dispatch({
				type: SET_SELECT_JEWELRY,
				payload,
			})
		},
		// 新增头像秀的饰品信息
		addAvatarJewelry: payload => {
			dispatch({
				type: ADD_AVATAR_JEWELRY,
				payload,
			})
		},
		// 移除头像秀的饰品信息
		removeAvatarJewelry: payload => {
			dispatch({
				type: REMOVE_AVATAR_JEWELRY,
				payload,
			})
		},
		// 更新头像秀的饰品信息
		updateAvatarJewelry: payload => {
			dispatch({
				type: UPDATE_AVATAR_JEWELRY,
				payload,
			})
		},
	}
	return actions
}

export default avatarShowInfoActions

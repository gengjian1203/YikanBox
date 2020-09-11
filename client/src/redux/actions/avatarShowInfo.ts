import {
	INIT_AVATAR_INFO,
	SET_AVATAR_IMAGE,
	SET_AVATAR_JEWELRY,
	SET_SELECT_JEWELRY,
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
		// 设置头像秀的背景图片
		setAvatarImage: payload => {
			dispatch({
				type: SET_AVATAR_IMAGE,
				payload,
			})
		},
		// 设置头像秀的饰品信息
		setAvatarJewelry: payload => {
			dispatch({
				type: SET_AVATAR_JEWELRY,
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
	}
	return actions
}

export default avatarShowInfoActions

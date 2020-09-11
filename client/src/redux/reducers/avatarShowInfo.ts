import { produce } from 'immer'
import {
	INIT_AVATAR_INFO,
	SET_AVATAR_IMAGE,
	SET_AVATAR_JEWELRY,
	SET_SELECT_JEWELRY,
} from '@/redux/constants/avatarShowInfo'

const INITIAL_STATE = {
	strAvatarImage: '', // 头像底图
	mapAvatarJewelry: {}, // 饰品表
	objSelectJewelry: {}, // 选中饰品对象
}

export default function avatarShowInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 初始化头像秀的信息
			case INIT_AVATAR_INFO:
				draft = INITIAL_STATE
				return draft
			// 设置头像秀的背景图片
			case SET_AVATAR_IMAGE:
				draft.strAvatarImage = payload
				return draft
			// 设置头像秀的饰品信息
			case SET_AVATAR_JEWELRY:
				draft.mapAvatarJewelry = payload
				return draft
			// 设置选中的饰品信息
			case SET_SELECT_JEWELRY:
				draft.objSelectJewelry = payload
				return draft
			default:
				return draft
		}
	})
}

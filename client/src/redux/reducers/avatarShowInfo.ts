import { produce } from 'immer'
import {
	INIT_AVATAR_INFO,
	SET_AVATAR_IMAGE,
	SET_AVATAR_JEWELRY,
	SET_SELECT_TYPE,
	SET_SELECT_JEWELRY,
	ADD_AVATAR_JEWELRY,
	REMOVE_AVATAR_JEWELRY,
	UPDATE_AVATAR_JEWELRY,
} from '@/redux/constants/avatarShowInfo'

const INITIAL_STATE = {
	strAvatarImage: '', // 头像底图
	arrAvatarJewelry: [], // 饰品列表(有序)
	strSelectType: '', // 操作状态 // 'BTN_FLIP'-翻转 'BTN_DELETE'-删除 'BTN_ADD'-复制 'BTN_RESIZE'-调整尺寸 'MOVE'-拖动
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
				draft.arrAvatarJewelry = payload
				return draft
			// 设置操作的类型
			case SET_SELECT_TYPE:
				draft.strSelectType = payload
				return draft
			// 设置选中的饰品信息
			case SET_SELECT_JEWELRY:
				draft.objSelectJewelry = payload
				return draft
			// 新增头像秀的饰品信息
			case ADD_AVATAR_JEWELRY:
				draft.arrAvatarJewelry.push(payload)
				return draft
			// 移除头像秀的饰品信息
			case REMOVE_AVATAR_JEWELRY:
				{
					const nIndex = draft.arrAvatarJewelry.findIndex(item => {
						return item.id === payload.id
					})
					if (nIndex >= 0) {
						draft.strSelectType = ''
						draft.objSelectJewelry = {}
						draft.arrAvatarJewelry.splice(nIndex, 1)
					}
				}
				return draft
			// 更新头像秀的饰品信息
			case UPDATE_AVATAR_JEWELRY:
				{
					const nIndex = draft.arrAvatarJewelry.findIndex(item => {
						return item.id === payload.id
					})
					if (nIndex >= 0) {
						draft.strSelectType = ''
						draft.objSelectJewelry = payload
						draft.arrAvatarJewelry[nIndex] = payload
					}
				}
				return draft
			default:
				return draft
		}
	})
}

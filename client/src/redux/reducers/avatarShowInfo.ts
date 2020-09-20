import { produce } from 'immer'
import { deepClone } from '@/utils/index'
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

const LIMIE_AVATAR_SHOW_LIST = 10
const INITIAL_STATE = {
	nAvatarShowListPoint: 0, // 操作指针
	arrAvatarShowList: [
		{
			strAvatarImage: '', // 头像底图
			arrAvatarJewelry: [], // 饰品列表(有序)
			strSelectType: '', // 操作状态 // 'BTN_FLIP'-翻转 'BTN_DELETE'-删除 'BTN_ADD'-复制 'BTN_RESIZE'-调整尺寸 'MOVE'-拖动
			objSelectJewelry: {}, // 选中饰品对象
		},
	], // 操作记录列表
}

const getNewAvatarShow = draft => {
	return draft.arrAvatarShowList[draft.nAvatarShowListPoint]
}

// 新建操作记录
const newAvatarShow = draft => {
	// 清除废弃分支操作
	draft.arrAvatarShowList.splice(draft.nAvatarShowListPoint + 1, 999)
	// 新建操作记录
	const objAvatarShowNew = deepClone(
		draft.arrAvatarShowList[draft.nAvatarShowListPoint]
	)
	draft.arrAvatarShowList.push(objAvatarShowNew)
	draft.nAvatarShowListPoint++
	// 超出列表最大限制则弹出最古老操作记录
	if (draft.arrAvatarShowList.length > LIMIE_AVATAR_SHOW_LIST) {
		draft.arrAvatarShowList.shift()
		draft.nAvatarShowListPoint--
	}
}

// 清除头像为空的脏数据操作记录
const cleanAvatarShow = draft => {
	if (draft.arrAvatarShowList.length >= 2) {
		if (draft.arrAvatarShowList[0].strAvatarImage === '') {
			draft.arrAvatarShowList.shift()
			draft.nAvatarShowListPoint--
		}
	}
}

export default function avatarShowInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 初始化头像秀的信息
			case INIT_AVATAR_INFO:
				draft = INITIAL_STATE
				return draft
			// 设置操作记录指针
			case SET_AVATAR_SHOW_LIST_POINT:
				draft.nAvatarShowListPoint = payload
				return draft
			// 设置头像秀的背景图片
			case SET_AVATAR_IMAGE:
				newAvatarShow(draft)
				getNewAvatarShow(draft).strAvatarImage = payload
				getNewAvatarShow(draft).arrAvatarJewelry = []
				getNewAvatarShow(draft).strSelectType = ''
				getNewAvatarShow(draft).objSelectJewelry = {}
				cleanAvatarShow(draft)
				return draft
			// 设置操作的类型
			case SET_SELECT_TYPE:
				getNewAvatarShow(draft).strSelectType = payload
				return draft
			// 设置选中的饰品信息
			case SET_SELECT_JEWELRY:
				getNewAvatarShow(draft).objSelectJewelry = payload
				return draft
			// 新增头像秀的饰品信息
			case ADD_AVATAR_JEWELRY:
				newAvatarShow(draft)
				getNewAvatarShow(draft).arrAvatarJewelry.push(payload)
				return draft
			// 移除头像秀的饰品信息
			case REMOVE_AVATAR_JEWELRY:
				{
					newAvatarShow(draft)
					const objNewAvatarShow = getNewAvatarShow(draft)
					const nIndex = objNewAvatarShow.arrAvatarJewelry.findIndex(item => {
						return item.id === payload.id
					})
					if (nIndex >= 0) {
						objNewAvatarShow.strSelectType = ''
						objNewAvatarShow.objSelectJewelry = {}
						objNewAvatarShow.arrAvatarJewelry.splice(nIndex, 1)
					}
				}
				return draft
			// 更新头像秀的饰品信息
			case UPDATE_AVATAR_JEWELRY:
				{
					newAvatarShow(draft)
					const objNewAvatarShow = getNewAvatarShow(draft)
					const nIndex = objNewAvatarShow.arrAvatarJewelry.findIndex(item => {
						return item.id === payload.id
					})
					if (nIndex >= 0) {
						objNewAvatarShow.strSelectType = ''
						objNewAvatarShow.objSelectJewelry = payload
						objNewAvatarShow.arrAvatarJewelry[nIndex] = payload
					}
				}
				return draft
			default:
				return draft
		}
	})
}

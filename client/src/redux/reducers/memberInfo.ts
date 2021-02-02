import { produce } from 'immer'
import StorageManager from '@/services/StorageManager'
import ResourceManager from '@/services/ResourceManager'

import {
	SET_MEMBER_INFO,
	ADD_COLLECTION_ARTICLE_INFO,
	REMOVE_COLLECTION_ARTICLE_INFO,
	PUSH_MINE_BADGE_LIST,
	CHANGE_MINE_BORDER_CODE,
	UPDATE_AVATAR_URL,
	UPDATE_MONEY,
} from '@/redux/constants/memberInfo'

const m_managerStorage = StorageManager.getInstance()

const INITIAL_STATE = {
	user_avatarUrl: '',
	data_strMineBorderCode: '',
	data_arrCollectionArticleList: [],
	data_arrMineBadgeList: [],
	data_money: 0,
}

export default function memberInfoReducer(state = INITIAL_STATE, action: any) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 设置成员信息
			case SET_MEMBER_INFO:
				draft = payload
				if (draft) {
					draft.data_money = payload?.data_money ? payload?.data_money : 0
				}
				m_managerStorage.setStorageSync('memberInfo', draft)
				if (payload && payload.user_avatarUrl) {
					ResourceManager.getStaticUrl(payload.user_avatarUrl)
				}
				return draft
			// 新增当前人的文章收藏信息
			case ADD_COLLECTION_ARTICLE_INFO:
				draft.data_arrCollectionArticleList.push(payload)
				return draft
			// 移除当前人指定文章的收藏信息
			case REMOVE_COLLECTION_ARTICLE_INFO:
				const nIndxe = draft.data_arrCollectionArticleList.findIndex(item => {
					return payload._id === item._id
				})
				draft.data_arrCollectionArticleList.splice(nIndxe, 1)
				return draft
			// 增加徽章列表
			case PUSH_MINE_BADGE_LIST:
				draft.data_arrMineBadgeList.push(payload)
				return draft
			// 切换使用的头像框
			case CHANGE_MINE_BORDER_CODE:
				draft.data_strMineBorderCode = payload
				return draft
			// 更新头像url
			case UPDATE_AVATAR_URL:
				draft.user_avatarUrl = payload
				return draft
			// 更新金额
			case UPDATE_MONEY:
				draft.data_money = payload
				return draft
			default:
				return draft
		}
	})
}

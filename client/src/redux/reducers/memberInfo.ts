import { produce } from 'immer'
import {
	SET_MEMBER_INFO,
	ADD_COLLECTION_ARTICLE_INFO,
	REMOVE_COLLECTION_ARTICLE_INFO,
	PUSH_MINE_BADGE_LIST,
} from '@/redux/constants/memberInfo'

const INITIAL_STATE = {
	data_arrCollectionArticleList: [],
	data_arrMineBadgeList: [],
}

export default function memberInfoReducer(state = INITIAL_STATE, action: any) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 设置成员信息
			case SET_MEMBER_INFO:
				draft = payload
				return draft
			case ADD_COLLECTION_ARTICLE_INFO:
				draft.data_arrCollectionArticleList.push(payload)
				return draft
			case REMOVE_COLLECTION_ARTICLE_INFO:
				const nIndxe = draft.data_arrCollectionArticleList.findIndex(item => {
					return payload._id === item._id
				})
				draft.data_arrCollectionArticleList.splice(nIndxe, 1)
				return draft
			case PUSH_MINE_BADGE_LIST:
				draft.data_arrMineBadgeList.push(payload)
				return draft
			default:
				return draft
		}
	})
}

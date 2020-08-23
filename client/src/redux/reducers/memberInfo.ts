import { produce } from 'immer'
import {
	SET_MEMBER_INFO,
	ADD_COLLECTION_ARTICLE_INFO,
	REMOVE_COLLECTION_ARTICLE_INFO,
} from '@/redux/constants/memberInfo'

const INITIAL_STATE = {
	data_arrCollectionArticleList: [],
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
			default:
				return draft
		}
	})
}

import { produce } from 'immer'
import {
	SET_ARTICLE_CURRENT,
	SET_ARTICLE_LIST,
} from '@/redux/constants/articleInfo'

const INITIAL_STATE = {
	nArticleCurrent: 0,
	arrArticleList: [],
}

export default function articleInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 设置选中文章索引
			case SET_ARTICLE_CURRENT:
				draft.nArticleCurrent = payload
				return draft
			// 设置文章列表
			case SET_ARTICLE_LIST:
				draft.arrArticleList = payload
				return draft
			default:
				return draft
		}
	})
}

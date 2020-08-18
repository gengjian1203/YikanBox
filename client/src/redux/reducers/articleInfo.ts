import { produce } from 'immer'
import {
	SIZE_PAGE_DISCOVER,
	SET_ARTICLE_CURRENT,
	SET_ARTICLE_LIST,
	UPDATE_ARTICLE_LIST_SPLICE,
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
			// 更新指定分页的文章列表
			case UPDATE_ARTICLE_LIST_SPLICE:
				const nPageNum = payload.nPageNum
				const arrDataList = payload.arrDataList
				draft.arrArticleList.splice(
					nPageNum * SIZE_PAGE_DISCOVER,
					SIZE_PAGE_DISCOVER,
					...arrDataList
				)
				return draft
			default:
				return draft
		}
	})
}

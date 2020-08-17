import {
	SET_ARTICLE_CURRENT,
	SET_ARTICLE_LIST,
} from '@/redux/constants/articleInfo'

const articleInfoActions = dispatch => {
	const actions = {
		// 设置选中文章索引
		setArticleCurrent: payload => {
			dispatch({
				type: SET_ARTICLE_CURRENT,
				payload,
			})
		},
		// 设置文章列表
		setArticleList: payload => {
			dispatch({
				type: SET_ARTICLE_LIST,
				payload,
			})
		},
	}
	return actions
}

export default articleInfoActions

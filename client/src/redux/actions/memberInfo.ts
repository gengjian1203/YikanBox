import {
	SET_MEMBER_INFO,
	ADD_COLLECTION_ARTICLE_INFO,
	REMOVE_COLLECTION_ARTICLE_INFO,
} from '@/redux/constants/memberInfo'

const memberInfoActions = dispatch => {
	const actions = {
		// 设置成员信息
		setMemberInfo: payload => {
			dispatch({
				type: SET_MEMBER_INFO,
				payload,
			})
		},
		// 新增当前人的文章收藏信息
		addCollectionArticleInfo: payload => {
			dispatch({
				type: ADD_COLLECTION_ARTICLE_INFO,
				payload,
			})
		},
		// 移除当前人指定文章的收藏信息
		removeCollectionArticleInfo: payload => {
			dispatch({
				type: REMOVE_COLLECTION_ARTICLE_INFO,
				payload,
			})
		},
	}
	return actions
}

export default memberInfoActions

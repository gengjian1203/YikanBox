import {
	SET_MEMBER_INFO,
	ADD_COLLECTION_ARTICLE_INFO,
	REMOVE_COLLECTION_ARTICLE_INFO,
	PUSH_MINE_BADGE_LIST,
	CHANGE_MINE_BORDER_CODE,
	UPDATE_AVATAR_URL,
	UPDATE_MONEY,
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
		// 增加徽章列表
		pushMineBadgeList: payload => {
			dispatch({
				type: PUSH_MINE_BADGE_LIST,
				payload,
			})
		},
		// 切换使用的头像框
		changeMineBorderCode: payload => {
			dispatch({
				type: CHANGE_MINE_BORDER_CODE,
				payload,
			})
		},
		// 更新头像url
		updateAvatarUrl: payload => {
			dispatch({
				type: UPDATE_AVATAR_URL,
				payload,
			})
		},
		// 更新头像url
		updateMoney: payload => {
			dispatch({
				type: UPDATE_MONEY,
				payload,
			})
		},
	}
	return actions
}

export default memberInfoActions

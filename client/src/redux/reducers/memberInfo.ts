import { produce } from 'immer'
import { SET_MEMBER_INFO } from '@/redux/constants/memberInfo'

const INITIAL_STATE = {
	data_arrArticleLikeList: [],
}

export default function memberInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 设置成员信息
			case SET_MEMBER_INFO:
				draft = payload
				return draft
			default:
				return draft
		}
	})
}

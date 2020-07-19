import { produce } from 'immer'
import {
	SET_MAIN_PATH,
	SET_BOTTOM_BAR_LIST,
	SET_BOTTOM_BAR_SELECT,
} from '@/redux/constants/appInfo'

const INITIAL_STATE = {
	strMainPath: '',
	objBottomBarInfo: {
		nSelectIndex: 0,
		arrBottomBarList: [],
	},
}

export default function appInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			case SET_MAIN_PATH:
				draft.strMainPath = payload
				return draft
			case SET_BOTTOM_BAR_LIST:
				draft.objBottomBarInfo.arrBottomBarList = payload
				return draft
			case SET_BOTTOM_BAR_SELECT:
				draft.objBottomBarInfo.nSelectIndex = payload
				return draft
			default:
				return draft
		}
	})
}

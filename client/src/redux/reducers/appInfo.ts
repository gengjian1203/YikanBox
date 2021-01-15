import { produce } from 'immer'
import {
	SET_APP_INFO,
	SET_IS_IOS,
	SET_IS_IPHONEX,
	SET_HEIGHT_NAVIGATION,
	SET_HEIGHT_NAVIGATION_HEADER,
	SET_HEIGHT_TABBAR,
	SET_HEIGHT_TABBAR_BOTTOM,
	SET_BOTTOM_BAR_SELECT,
} from '@/redux/constants/appInfo'

const INITIAL_STATE = {
	objAppInfo: {
    strBottomBarListSelectId: ''
  },
	isIOS: false,
	isPhoneX: false,
	objAppHeight: {
		nHeightNavigation: 0,
		nHeightNavigationHeader: 0,
		nHeightTabbar: 0,
		nHeightTabbarBottom: 0,
	},
}

export default function appInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			case SET_APP_INFO:
				draft.objAppInfo = payload
				return draft
			case SET_IS_IOS:
				draft.isIOS = payload
				return draft
			case SET_IS_IPHONEX:
				draft.isPhoneX = payload
				return draft
			case SET_HEIGHT_NAVIGATION:
				draft.objAppHeight.nHeightNavigation = payload
				return draft
			case SET_HEIGHT_NAVIGATION_HEADER:
				draft.objAppHeight.nHeightNavigationHeader = payload
				return draft
			case SET_HEIGHT_TABBAR:
				draft.objAppHeight.nHeightTabbar = payload
				return draft
			case SET_HEIGHT_TABBAR_BOTTOM:
				draft.objAppHeight.nHeightTabbarBottom = payload
				return draft
			case SET_BOTTOM_BAR_SELECT:
				draft.objAppInfo.strBottomBarListSelectId = payload
				return draft
			default:
				return draft
		}
	})
}

import { combineReducers } from 'redux'
import appInfo from './appInfo'
import memberInfo from './memberInfo'
import systemInfo from './systemInfo'

export default combineReducers({
	appInfo,
	memberInfo,
	systemInfo,
})

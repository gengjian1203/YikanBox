import { combineReducers } from 'redux'
import appInfo from './appInfo'
import systemInfo from './systemInfo'

export default combineReducers({
	appInfo,
	systemInfo,
})

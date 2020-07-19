import { combineReducers } from 'redux'
import counter from './counter'
import appInfo from './appInfo'

export default combineReducers({
	appInfo,
	counter,
})

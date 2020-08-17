import { combineReducers } from 'redux'
import appInfo from './appInfo'
import articleInfo from './articleInfo'
import memberInfo from './memberInfo'
import systemInfo from './systemInfo'

export default combineReducers({
	appInfo,
	articleInfo,
	memberInfo,
	systemInfo,
})

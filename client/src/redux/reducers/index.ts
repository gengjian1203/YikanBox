import { combineReducers } from 'redux'
import appInfo from './appInfo'
import articleInfo from './articleInfo'
import memberInfo from './memberInfo'
import shareInfo from './shareInfo'
import systemInfo from './systemInfo'

export default combineReducers({
	appInfo,
	articleInfo,
	memberInfo,
	shareInfo,
	systemInfo,
})

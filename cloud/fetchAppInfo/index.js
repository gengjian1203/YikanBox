// import queryAppInfo from './queryAppInfo/index'

// 云函数入口文件
const cloud = require('wx-server-sdk')
const queryAppInfo = require('queryAppInfo/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

/**
 * fetchAppInfo
 * 处理跟AppInfo相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const {
		OPENID: strOpenId,
		APPID: strAppId,
		UNIONID: strUnionId,
	} = cloud.getWXContext()

	const db = cloud.database()

	let objResult = {
		code: 500,
		data: {},
	}

	switch (event.type) {
		case 'QUERY':
			objResult = await queryAppInfo(event, db)
			break
		case 'UPDATE':
			break
		default:
			break
	}

	return objResult
}

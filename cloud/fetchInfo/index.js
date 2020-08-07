// 云函数入口文件
const cloud = require('wx-server-sdk')
const queryLoginInfo = require('queryLoginInfo/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

// 校验返回值
const validResult = (objTmp) => {
	if (objTmp.code) {
		objTmp.code = 500
	}
	return objTmp
}

/**
 * fetchInfo
 * 处理所有混用 Info 相关的信息（节约接口调用次数）
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const {
		OPENID,
		APPID,
		UNIONID,
	} = cloud.getWXContext()

	const db = cloud.database()
	const strMemberId = `mem-${OPENID}`

	let objResult = {}

	switch (event.type) {
		case 'LOGIN':
			objResult = await queryLoginInfo(event, db, strMemberId)
			break
		case 'UPDATE':
			break
		default:
			break
	}

	return validResult(objResult)
}

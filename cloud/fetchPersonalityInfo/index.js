// 云函数入口文件
const cloud = require('wx-server-sdk')
const createPersonalityInfo = require('createPersonalityInfo/index.js')
const queryPersonalityInfo = require('queryPersonalityInfo/index.js')
const updatePersonalityInfo = require('updatePersonalityInfo/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

// 校验返回值
const validResult = objTmp => {
	if (objTmp.code) {
		objTmp.code = 500
	}
	return objTmp
}

/**
 * fetchPersonalityInfo
 * 处理跟 个性秀 相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	let objResult = {}

	const db = cloud.database()
	const strMemberId = `mem-${OPENID}`
	console.log('请求人:', strMemberId, event.type)
	// console.log('fetchQRCodeInfo.', event.type, event.data)

	switch (event.type) {
		case 'CREATE_PERSONALITY':
			objResult = await createPersonalityInfo(event.data, db, strMemberId)
			break
		case 'QUERY_PERSONALITY':
			objResult = await queryPersonalityInfo(event.data, db, strMemberId)
			break
		case 'UPDATE_PERSONALITY':
			objResult = await updatePersonalityInfo(event.data, db, strMemberId)
			break
		default:
			break
	}

	return validResult(objResult)
}

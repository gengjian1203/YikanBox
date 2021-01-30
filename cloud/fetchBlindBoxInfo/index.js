// 云函数入口文件
const cloud = require('wx-server-sdk')
const openBlindBox = require('openBlindBox/index.js')
const queryBlindBoxInfo = require('queryBlindBoxInfo/index.js')

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
 * fetchBlindBoxInfo
 * 处理跟 盲盒 相关的信息
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
		case 'OPEN_BLIND_BOX':
			objResult = await openBlindBox(event.data, db, strMemberId)
			break
		case 'QUERY_BLIND_BOX_INFO':
			objResult = await queryBlindBoxInfo(event.data, db, strMemberId)
			break
		default:
			break
	}

	return validResult(objResult)
}

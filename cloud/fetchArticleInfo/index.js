// 云函数入口文件
const cloud = require('wx-server-sdk')
const queryArticleInfo = require('queryArticleInfo/index.js')
const queryArticleList = require('queryArticleList/index.js')

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
 * fetchArticleInfo
 * 处理跟 ArticleInfo 相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	const db = cloud.database()
	const strMemberId = `mem-${OPENID}`
	console.log('请求人:', strMemberId, event.type)

	let objResult = {}

	switch (event.type) {
		case 'INFO':
			objResult = await queryArticleInfo(event.data, db)
			break
		case 'LIST':
			objResult = await queryArticleList(event.data, db)
			break
		default:
			break
	}

	return validResult(objResult)
}

// 云函数入口文件
const cloud = require('wx-server-sdk')
const addMemberInfo = require('addMemberInfo/index.js')
const queryMemberInfo = require('queryMemberInfo/index.js')
const addCollectionArticle = require('addCollectionArticle/index.js')
const removeCollectionArticle = require('removeCollectionArticle/index.js')
const addMineBadge = require('addMineBadge/index.js')
const updateMineBorderCode = require('updateMineBorderCode/index.js')
const updateAvatarUrl = require('updateAvatarUrl/index.js')

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
 * fetchMemberInfo
 * 处理跟 MemberInfo 相关的信息
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
		case 'ADD_MEMBER':
			objResult = await addMemberInfo(event.data, db, strMemberId)
			break
		case 'QUERY_MEMBER':
			objResult = await queryMemberInfo(event.data, db, strMemberId)
			break
		case 'ADD_COLLECTION_ARTICLE':
			objResult = await addCollectionArticle(event.data, db, strMemberId)
			break
		case 'REMOVE_COLLECTION_ARTICLE':
			objResult = await removeCollectionArticle(event.data, db, strMemberId)
			break
		case 'ADD_MINE_BADGE':
			objResult = await addMineBadge(event.data, db, strMemberId)
			break
		case 'UPDATE_MINE_BORDER_CODE':
			objResult = await updateMineBorderCode(event.data, db, strMemberId)
			break
		case 'UPDATE_AVATAR_URL':
			objResult = await updateAvatarUrl(event.data, db, strMemberId)
			break
		default:
			break
	}

	return validResult(objResult)
}

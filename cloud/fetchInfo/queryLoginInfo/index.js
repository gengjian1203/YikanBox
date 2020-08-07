/**
 * queryLoginInfo
 * 查询跟AppInfo相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryLoginInfo (event, db, strMemberId) {
	let objResult = {}
	let objAppInfo = {}
	let objMemberInfo = {}

	try {
		objAppInfo = await db.collection('appInfo').get()
	} catch (e) {
		// 没有查到。异常。
		objResult = {
			code: 500,
			data: e,
		}
		console.error('queryAppInfo error', e)
	}
	try {
		objMemberInfo = await db.collection('memberInfo').doc(strMemberId).get()
	} catch (e) {
		console.error('queryMemberInfo error', e)
	}

	objResult = { 
		code: 200,
		data: {
			appInfo: objAppInfo.data[0], 
			memberInfo: objMemberInfo
		}
	}

	return objResult
}

module.exports = queryLoginInfo

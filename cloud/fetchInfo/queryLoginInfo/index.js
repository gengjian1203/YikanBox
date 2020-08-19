/**
 * queryLoginInfo
 * 查询登录所需的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 更新用户信息
const updateMemberInfo = async (db, strMemberId, objMemberData) => {
	let objResult = {}

	try {
		if (objMemberData !== null) {
			const data = objMemberData.data
			const date = new Date()
			const YYYY = date.getUTCFullYear()
			const MM = date.getUTCMonth() + 1
			const DD = date.getUTCDate()
			const hh = date.getUTCHours()
			const mm = date.getUTCMinutes()
			const ss = date.getUTCSeconds()
			const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
			const nCountLogin = data.app_countLogin ? ++data.app_countLogin : 1

			console.log('updateMemberInfo', strMemberId, data.app_countLogin, data)
			await db
				.collection('memberInfo')
				.doc(strMemberId)
				.update({
					data: {
						app_loginDate: date, // 登录时间
						app_loginTime: time, // 登录时间
						app_updateDate: date, // 修改时间
						app_updateTime: time, // 修改时间
						app_countLogin: nCountLogin, // 更新登录次数
					},
				})

			objResult = {
				...data,
				app_loginDate: date, // 登录时间
				app_loginTime: time, // 登录时间
				app_updateDate: date, // 修改时间
				app_updateTime: time, // 修改时间
				app_countLogin: nCountLogin, // 更新登录次数
			}
		}
	} catch (e) {
		console.log('updateMemberInfo error.', e)
	}

	return objResult
}

async function queryLoginInfo(event, db, strMemberId) {
	let objResult = {}
	let objAppInfo = {}
	let objMemberData = null
	let objMemberInfo = {}
	// 查询小程序级别信息
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
	// 查询是否为已注册用户
	try {
		objMemberData = await db.collection('memberInfo').doc(strMemberId).get()
	} catch (e) {
		console.error('queryMemberInfo error', e)
	}

	// 更新用户信息
	objMemberInfo = await updateMemberInfo(db, strMemberId, objMemberData)

	objResult = {
		code: 200,
		data: {
			appInfo: objAppInfo,
			memberInfo: objMemberInfo,
		},
	}

	return objResult
}

module.exports = queryLoginInfo

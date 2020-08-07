/**
 * addMemberInfo
 * 新增注册成员信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function addMemberInfo (data, db, strMemberId) {
	let objResult = {}
	const date = new Date()
	const YYYY = date.getUTCFullYear()
	const MM = date.getUTCMonth() + 1
	const DD = date.getUTCDate()
	const hh = date.getUTCHours()
	const mm = date.getUTCMinutes()
	const ss = date.getUTCSeconds()
	const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

	const objMember = {
		// 创建基本信息
		// 系统级
		app_createDate: date,    // 创建时间
		app_createTime: time,    // 创建时间
		app_loginDate: date,    // 登录时间
		app_loginTime: time,    // 登录时间
		app_updateDate: date,    // 修改时间
		app_updateTime: time,    // 修改时间
		// 个人信息
		user_id: strMemberId,
		user_openid: strMemberId.substr(4),
		user_nickName: data.nickName, // 昵称*
		user_avatarUrl: data.avatarUrl, // 头像*
		user_gender: data.gender, // 性别*
		user_country: data.country, // 国家*
		user_province: data.province, // 省份*
		user_city: data.city, // 城市*
		user_language: data.language, // 语言*
		user_cellphone: data.cellphone, // 手机号
	}

	// 创建新的玩家信息	
	try {
		objResult = {
			code: 200,
			data: await db.collection('memberInfo').add({ data: objMember })
		}
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('addMemberInfo error', e)
	}

	return objResult
}

module.exports = addMemberInfo

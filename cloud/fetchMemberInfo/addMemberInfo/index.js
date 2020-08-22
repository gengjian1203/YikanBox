/**
 * addMemberInfo
 * 新增注册成员信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function addMemberInfo(data, db, strMemberId) {
	let objResult = {}
	let objMemberInfo = undefined
	const date = new Date()
	const YYYY = date.getFullYear()
	const MM = date.getMonth() + 1
	const DD = date.getDate()
	const hh = date.getHours()
	const mm = date.getMinutes()
	const ss = date.getSeconds()
	const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

	// 查询是否有该人注册
	try {
		objMemberInfo = await db.collection('memberInfo').doc(strMemberId).get()
	} catch (e) {
		console.error('queryMemberInfo error', e)
	}
	if (objMemberInfo) {
		objResult = {
			code: 200,
			data: objMemberInfo,
		}
		return objResult
	}

	// 创建新用户
	const objMember = {
		// 创建基本信息
		_id: strMemberId, // 主键
		// 系统级
		app_countLogin: 0, // 登录次数
		app_createDate: date, // 创建时间
		app_createTime: time, // 创建时间
		app_loginDate: date, // 登录时间
		app_loginTime: time, // 登录时间
		app_updateDate: date, // 修改时间
		app_updateTime: time, // 修改时间
		// 个人信息
		user_openid: strMemberId.substr(4),
		user_nickName: data.nickName, // 昵称*
		user_avatarUrl: data.avatarUrl, // 头像*
		user_gender: data.gender, // 性别*
		user_country: data.country, // 国家*
		user_province: data.province, // 省份*
		user_city: data.city, // 城市*
		user_language: data.language, // 语言*
		user_cellphone: data.cellphone, // 手机号
		// 应用信息
		data_level: 1, // 等级
		data_exp: 0, // 经验
		data_arrArticleCollectionList: [], // 收藏文章列表
	}
	// 创建新的玩家信息
	try {
		await db.collection('memberInfo').add({ data: objMember })
		objResult = {
			code: 200,
			data: { data: objMember },
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

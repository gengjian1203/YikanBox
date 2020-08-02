/**
 * queryAppInfo
 * 查询跟AppInfo相关的信息
 * @param {*} event
 * @param {*} db
 * @returns
 */

async function queryAppInfo (event, db) {
	let objResult = {
		code: 500,
		data: {},
	}

	try {
		objResult = {
			code: 200,
			data: await db.collection('appInfo').get(),
		}
	} catch (e) {
		// 没有查到。异常。
		objResult = {
			code: 500,
			data: e,
		}
		console.error('queryAppInfo error', e)
	}

	return objResult
}

module.exports = queryAppInfo

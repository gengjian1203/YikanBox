/**
 * queryBlindBoxInfo
 * 查询已有盲盒信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function queryBlindBoxInfo(data, db, strMemberId) {
	let objResult = {}

	try {
		objResult = {
			code: 200,
			data: await db.collection('TB_BLIND_BOX').get(),
		}
	} catch (e) {
		console.error('queryBlindBoxInfo error', e)
	}

	return objResult
}

module.exports = queryBlindBoxInfo

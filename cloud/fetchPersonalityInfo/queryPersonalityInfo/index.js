/**
 * queryPersonalityInfo
 * 查询个性秀信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function queryPersonalityInfo(data, db, strMemberId) {
	let objResult = {}

	try {
		objResult = {
			code: 200,
			data: await db.collection('personalityInfo').doc(strMemberId).get(),
		}
	} catch (e) {
		console.error('queryPersonalityInfo error', e)
	}

	return objResult
}

module.exports = queryPersonalityInfo

/**
 * createPersonalityInfo
 * 创建个性秀信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function createPersonalityInfo(data, db, strMemberId) {
	let objResult = {}

	try {
		objResult = {
			code: 200,
			data: await db.collection('personalityInfo').doc(strMemberId).get(),
		}
	} catch (e) {
		console.error('createPersonalityInfo error', e)
	}

	return objResult
}

module.exports = createPersonalityInfo

/**
 * updatePersonalityInfo
 * 更新个性秀信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function updatePersonalityInfo(data, db, strMemberId) {
	let objResult = {}

	try {
		objResult = {
			code: 200,
			data: await db.collection('personalityInfo').doc(strMemberId).get(),
		}
	} catch (e) {
		console.error('updatePersonalityInfo error', e)
	}

	return objResult
}

module.exports = updatePersonalityInfo

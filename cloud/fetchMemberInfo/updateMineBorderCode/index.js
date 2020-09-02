/**
 * updateMineBorderCode
 * 更新使用中的头像框
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function updateMineBorderCode(data, db, strMemberId) {
	let objResult = {}

	try {
		// 更新收藏信息
		const res = await db
			.collection('memberInfo')
			.doc(strMemberId)
			.update({
				data: {
					data_strMineBorderCode: data.strMineBorderCode,
				},
			})
		objResult = {
			code: 200,
			data: { data: res },
		}
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('updateMineBorderCode error.', e)
	}

	return objResult
}

module.exports = updateMineBorderCode

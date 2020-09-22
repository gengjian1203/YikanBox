/**
 * updateAvatarUrl
 * 更新头像url
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function updateAvatarUrl(data, db, strMemberId) {
	let objResult = {}

	try {
		// 更新收藏信息
		const res = await db
			.collection('memberInfo')
			.doc(strMemberId)
			.update({
				data: {
					user_avatarUrl: data.user_avatarUrl,
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
		console.error('updateAvatarUrl error.', e)
	}

	return objResult
}

module.exports = updateAvatarUrl

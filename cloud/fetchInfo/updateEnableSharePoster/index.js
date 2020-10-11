/**
 * updateEnableSharePoster
 * 更新是否展示分享海报
 * @param {*} data
 * @param {*} db
 * @returns
 */

async function updateEnableSharePoster(data, db) {
	let objResult = {}

	try {
		// 更新信息
		const res = await db
			.collection('appInfo')
			.where({
				_id: db.command.exists(true),
			})
			.update({
				data: {
					isEnableSharePoster: data.isEnableSharePoster,
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
		console.error('updateEnableSharePoster error.', e)
	}

	return objResult
}

module.exports = updateEnableSharePoster

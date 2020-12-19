/**
 * updateEnableSafeMode
 * 更新是否安全模式
 * @param {*} data
 * @param {*} db
 * @returns
 */

async function updateEnableSafeMode(data, db) {
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
					isEnableSafeMode: data.isEnableSafeMode,
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
		console.error('updateEnableSafeMode error.', e)
	}

	return objResult
}

module.exports = updateEnableSafeMode

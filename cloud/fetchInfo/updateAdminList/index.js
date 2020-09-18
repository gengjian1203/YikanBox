/**
 * updateAdminList
 * 更新管理员列表
 * @param {*} data
 * @param {*} db
 * @returns
 */

async function updateAdminList(data, db) {
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
					arrAdminList: data.arrAdminList,
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
		console.error('updateAdminList error.', e)
	}

	return objResult
}

module.exports = updateAdminList

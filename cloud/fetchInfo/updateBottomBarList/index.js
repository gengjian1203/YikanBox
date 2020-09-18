/**
 * updateBottomBarList
 * 更新底部导航列表
 * @param {*} data
 * @param {*} db
 * @returns
 */

async function updateBottomBarList(data, db) {
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
					arrBottomBarList: data.arrBottomBarList,
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
		console.error('updateBottomBarList error.', e)
	}

	return objResult
}

module.exports = updateBottomBarList

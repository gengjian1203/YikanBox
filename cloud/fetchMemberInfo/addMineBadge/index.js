/**
 * addMineBadge
 * 激活新的徽章
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function addMineBadge(data, db, strMemberId) {
	let objResult = {}
	const date = new Date()
	const YYYY = date.getFullYear()
	const MM = date.getMonth() + 1
	const DD = date.getDate()
	const hh = date.getHours()
	const mm = date.getMinutes()
	const ss = date.getSeconds()
	const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

	try {
		const objAddBadge = {
			code: data.strBadgeCode,
			date: date,
			time: time,
		}
		// 更新收藏信息
		const res = await db
			.collection('memberInfo')
			.doc(strMemberId)
			.update({
				data: {
					data_arrMineBadgeList: db.command.addToSet(objAddBadge),
				},
			})
		objResult = {
			code: 200,
			data: { data: objAddBadge },
		}
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('addMineBadge error.', e)
	}

	return objResult
}

module.exports = addMineBadge

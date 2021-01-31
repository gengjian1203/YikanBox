/**
 * queryBlindBoxList
 * 查询抽取到的盲盒信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */

const MAX_LIMIT = 100 // 每次取100条

async function queryBlindBoxList(data, db, strMemberId) {
	let objResult = {}

	const collection = db.collection('TB_BLIND_LIST')
	const { nPageNum = 0, nPageSize = MAX_LIMIT } = data

	const res = await collection
		.where({
			memberId: strMemberId,
		})
		.orderBy('createDate', 'desc')
		.skip(nPageNum * nPageSize)
		.limit(nPageSize)
		.get()

	try {
		objResult = {
			code: 200,
			data: res,
		}
	} catch (e) {
		console.error('queryBlindBoxList error', e)
	}

	return objResult
}

module.exports = queryBlindBoxList

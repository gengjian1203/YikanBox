/**
 * queryBlindBoxInfo
 * 查询已有盲盒信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */

const MAX_LIMIT = 100 // 每次取100条

async function queryBlindBoxInfo(data, db, strMemberId) {
	let objResult = {}

	const collection = db.collection('TB_BLIND_BOX')
	const { nPageNum = 0, nPageSize = MAX_LIMIT } = data

	const res = await collection
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
		console.error('queryBlindBoxInfo error', e)
	}

	return objResult
}

module.exports = queryBlindBoxInfo

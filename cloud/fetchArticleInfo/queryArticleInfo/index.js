/**
 * queryArticleInfo
 * 查询跟 ArticleInfo 相关的信息
 * @param {*} data
 * @param {*} db
 * @returns
 */

const MAX_LIMIT = 100 // 每次取100条

async function queryArticleInfo (data, db) {
	let objResult = {}
	const collection = db.collection('articleInfo')
	const { 
		nPageNum = 0, 
		nPageSize = MAX_LIMIT 
	} = data

	try {
		objResult = {
			code: 200,
			data: await collection.orderBy('createDate','desc')
				.skip(nPageNum * nPageSize)
				.limit(nPageSize)
				.get()
		}
	} catch (e) {
		// 没有查到。异常。
		objResult = {
			code: 500,
			data: e,
		}
		console.error('queryArticleInfo error', e)
	}

	return objResult
}

module.exports = queryArticleInfo

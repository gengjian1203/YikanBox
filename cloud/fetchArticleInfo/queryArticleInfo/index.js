/**
 * queryArticleInfo
 * 查询指定ID的 ArticleInfo 的信息
 * @param {*} data
 * @param {*} db
 * @returns
 */

async function queryArticleInfo(data, db) {
	let objResult = {}
	const collection = db.collection('articleInfo')
	const { articleId = '' } = data

	try {
		objResult = {
			code: 200,
			data: await collection.doc(articleId).get(),
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

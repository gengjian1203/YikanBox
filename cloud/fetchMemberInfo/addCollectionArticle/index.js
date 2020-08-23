// interface IArticleInfoType {
//   _id: string // 文章ID
//   author: string // 文章作者
//   content: string // 文章内容
//   href: string // 文章Url
//   posterImg: string // 封面图Url
//   source: string // 文章爬取源
//   title: string // 文章标题
//   createDate: string // 爬取时间
//   collectDate?: string // 收藏时间
// }

/**
 * addCollectionArticle
 * 新增会话人的文章收藏信息
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function addCollectionArticle(data, db, strMemberId) {
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
		const objAddArticle = {
			...data,
			collectDate: date,
			collectTime: time,
		}
		// 更新收藏信息
		const res = await db
			.collection('memberInfo')
			.doc(strMemberId)
			.update({
				data: {
					data_arrCollectionArticleList: db.command.addToSet(objAddArticle),
				},
			})
		objResult = {
			code: 200,
			data: { data: objAddArticle },
		}
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('addCollectionArticle error.', e)
	}

	return objResult
}

module.exports = addCollectionArticle

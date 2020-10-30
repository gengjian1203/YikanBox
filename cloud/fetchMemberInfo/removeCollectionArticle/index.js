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
 * removeCollectionArticle
 * 移除会话人指定文章的收藏信息
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 更新人物的收藏信息
const updateMemberCollection = async (data, db, strMemberId) => {
	// 更新收藏信息
	const res = await db
		.collection('memberInfo')
		.doc(strMemberId)
		.update({
			data: {
				data_arrCollectionArticleList: db.command.pull({
					_id: db.command.eq(data._id),
				}),
			},
		})
	return res
}

// 更新文章的收藏信息
const updateArticleCollection = async (data, db, strMemberId) => {
	// 更新收藏信息
	const res = await db
		.collection('articleInfo')
		.doc(data._id)
		.update({
			data: {
				arrCollectionList: db.command.pull({
					memberId: db.command.eq(strMemberId),
				}),
			},
		})
	return res
}

async function removeCollectionArticle(data, db, strMemberId) {
	let objResult = {}

	try {
		Promise.all([
			updateMemberCollection(data, db, strMemberId),
			updateArticleCollection(data, db, strMemberId),
		])
			.then(res => {
				objResult = {
					code: 200,
					data: res,
				}
			})
			.catch(err => {
				objResult = {
					code: 500,
					data: err,
				}
			})
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('removeCollectionArticle error.', e)
	}

	return objResult
}

module.exports = removeCollectionArticle

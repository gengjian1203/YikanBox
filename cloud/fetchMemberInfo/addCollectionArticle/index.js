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

// 更新人物的收藏信息
const updateMemberCollection = async (data, db, strMemberId, date, time) => {
	const objAddArticle = {
		_id: data._id,
		collectDate: date,
		collectTime: time,
		title: data.title,
		author: data.author,
		posterImg: data.posterImg,
	}

	const res = await db
		.collection('memberInfo')
		.doc(strMemberId)
		.update({
			data: {
				data_arrCollectionArticleList: db.command.addToSet(objAddArticle),
			},
		})
	return res
}

// 更新文章的收藏信息
const updateArticleCollection = async (data, db, strMemberId, date, time) => {
	const objAddCollection = {
		memberId: strMemberId,
		collectDate: date,
		collectTime: time,
	}
	const res = await db
		.collection('articleInfo')
		.doc(data._id)
		.update({
			data: {
				arrCollectionList: db.command.addToSet(objAddCollection),
			},
		})
	return res
}

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
		Promise.all([
			updateMemberCollection(data, db, strMemberId, date, time),
			updateArticleCollection(data, db, strMemberId, date, time),
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
		console.error('addCollectionArticle error.', e)
	}

	return objResult
}

module.exports = addCollectionArticle

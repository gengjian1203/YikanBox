/**
 * 本地检查该文章是否被自己收藏过
 */
export const checkCollectionArticle = (
	arrCollectionArticleList: Array<any>,
	objArticleInfo: any
) => {
	if (arrCollectionArticleList) {
		const nIndex = arrCollectionArticleList.findIndex((item, index) => {
			return objArticleInfo._id === item._id
		})
		return nIndex >= 0
	} else {
		return false
	}
}

export default {
	checkCollectionArticle,
}

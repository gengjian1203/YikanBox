/**
 * 通过类型Code转义成文章来源类型名称
 */
export const getArticleTagName = (strSourceType: string | undefined) => {
	let strResult = ''
	switch (strSourceType) {
		case 'ZHIHU':
			strResult = '知乎'
			break
		default:
			strResult = '未知'
			break
	}
	return strResult
}

export default getArticleTagName

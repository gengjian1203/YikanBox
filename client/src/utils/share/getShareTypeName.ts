import { shareType } from '@/utils/index'
/**
 * 解析分享途径枚举
 * @param strShareType
 * @return
 */
export const getShareTypeName = strShareType => {
	let strResult = ''
	switch (strShareType) {
		case shareType.MINIPROGRAM:
			strResult = `搜索小程序`
			break
		case shareType.PATH_POPULARIZE:
			strResult = `分享推广链接`
			break
		case shareType.PATH_ARTICLE:
			strResult = `分享文章链接`
			break
		case shareType.PATH_AVATAR_SHOW:
			strResult = `分享头像秀链接`
			break
		default:
			strResult = `未知-${strShareType}`
			break
	}
	return strResult
}

export default getShareTypeName

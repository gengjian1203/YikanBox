/**
 * 解析分享途径枚举
 * @param strFromType
 * @return
 */
export const getFromTypeName = strFromType => {
	let strResult = ''
	switch (strFromType) {
		case 'PATH':
			strResult = `分享链接`
			break
		case 'QRCODE':
			strResult = `分享二维码`
			break
		default:
			strResult = `未知情况${strFromType}`
			break
	}
	return strResult
}

export default getFromTypeName

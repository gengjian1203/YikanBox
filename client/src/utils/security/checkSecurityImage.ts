import Taro from '@tarojs/taro'
import webApi from '@/api/checkContent'

/**
 * 校验敏感图片
 * @param strImageUrl 图片Url
 * @return true-正常照片 false-敏感照片
 */
export const checkSecurityImage = strImageUrl => {
	return new Promise((resolve, reject) => {
		Taro.getFileSystemManager().readFile({
			// encoding: 'ucs2',
			filePath: strImageUrl,
			success: async resReadFile => {
				console.log('checkSecurityImage readFile', resReadFile)
				const objParam = {
					value: resReadFile.data,
				}
				const resCheck = await webApi.checkImage(objParam)
				console.log('checkSecurityImage checkImage', resCheck)
				if (resCheck && resCheck.errCode === 0) {
					resolve(true)
				} else {
					Taro.showToast({
						title: '图片疑似有敏感内容，请更换其他图片',
						icon: 'none',
					})
					resolve(false)
				}
			},
			fail: err => {
				resolve(false)
			},
		})
	})
}

export default checkSecurityImage

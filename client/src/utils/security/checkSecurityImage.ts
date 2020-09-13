import Taro from '@tarojs/taro'
import { UUID } from '@/utils/index'
import webApi from '@/api/checkContent'

// 将图片上传到云存储中
const uploadImage = strImageUrl => {
	const strFileName = UUID()
	const strSecurityCloudPath = `security/${strFileName}.png`
	// console.log('uploadImage', strSecurityCloudPath, strImageUrl)
	return new Promise((resolve, reject) => {
		Taro.cloud.uploadFile({
			cloudPath: strSecurityCloudPath,
			filePath: strImageUrl, // 文件路径
			success: res => {
				console.log('checkSecurityImage uploadFile', res)
				resolve(res.fileID)
			},
			fail: err => {
				console.error('checkSecurityImage uploadFile', err)
				resolve('')
			},
		})
	})
}

// 调用接口校验图片
const checkImage = strImageId => {
	return new Promise(async (resolve, reject) => {
		const objParam = {
			value: strImageId,
		}
		const resCheck = await webApi.checkImage(objParam)
		// console.log('checkSecurityImage checkImage', resCheck)
		if (resCheck && resCheck.errCode === 0) {
			resolve(true)
		} else {
			resolve(false)
		}
	})
}

/**
 * 校验敏感图片
 * @param strImageUrl 图片Url
 * @return true-正常照片 false-敏感照片
 */
export const checkSecurityImage = async strImageUrl => {
	let isResult = false
	// 上传图片
	const strImageId = await uploadImage(strImageUrl)
	if (strImageId) {
		// 校验图片
		isResult = await checkImage(strImageId)
	}
	return isResult
}

export default checkSecurityImage

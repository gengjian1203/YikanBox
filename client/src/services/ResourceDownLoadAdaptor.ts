import Taro from '@tarojs/taro'
/**
 * 资源下载适配器
 *
 */
interface IResourceAdaptorType {
	support: (strUrl: string) => boolean
	resolve: (strUrl: string) => Promise<any> | string
}

// 微信头像适配器
class CWXThirdAdaptor implements IResourceAdaptorType {
	support = (strUrl: string) => {
		// https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erCaiaQc3iatoKLAmick8qY1e7lkf0zwtxH
		// console.log('CWXThirdAdaptor', strUrl)
		return strUrl.startsWith('https://thirdwx.qlogo.cn')
	}
	resolve = async (strUrl: string) => {
		return new Promise((resolve, reject) => {
			Taro.downloadFile({
				url: strUrl,
				success: res => {
					// console.log('CWXThirdAdaptor', res)
					resolve(res.tempFilePath)
				},
				fail: err => {
					console.error('CWXThirdAdaptor', err)
					resolve(strUrl)
				},
			})
		})
	}
}

// 云存储适配器
class CWXClouldAdaptor implements IResourceAdaptorType {
	support = (strUrl: string) => {
		// cloud://online-z8369.6f6e-online-z8369-1259256375/resource/banner/banner_03.jpg
		// console.log('CWXClouldAdaptor', strUrl)
		return strUrl.startsWith('cloud://')
	}
	resolve = async (strFileID: string) => {
		return new Promise((resolve, reject) => {
			Taro.cloud.downloadFile({
				fileID: strFileID,
				success: res => {
					// console.log('CWXClouldAdaptor2', res)
					resolve(res.tempFilePath)
				},
				fail: err => {
					console.error('CWXClouldAdaptor3', strFileID, err)
					resolve(strFileID)
				},
			})
		})
	}
}

// 第三方网络图片适配器
class CHttpsAdaptor implements IResourceAdaptorType {
	support = (strUrl: string) => {
		// https://pic1.zhimg.com/v2-f172d4ce0e20dcd50614c9a5373ee7d3.jpg?source=8673f162
		// console.log('CHttpsAdaptor', strUrl)
		return strUrl.startsWith('https://')
	}
	resolve = async (strUrl: string) => {
		return new Promise((resolve, reject) => {
			Taro.downloadFile({
				url: strUrl,
				success: res => {
					console.log('CHttpsAdaptor2', res)
					resolve(res.tempFilePath)
				},
				fail: err => {
					console.error('CHttpsAdaptor3', strUrl, err)
					resolve(strUrl)
				},
			})
		})
	}
}

// 兜底适配器
class COtherAdaptor implements IResourceAdaptorType {
	support = (strUrl: string) => {
		return true
	}
	resolve = (strUrl: string) => {
		let strResult = strUrl
		console.error('COtherAdaptor', strResult)
		return strResult
	}
}

const arrAdaptors = [
	new CWXThirdAdaptor(),
	new CWXClouldAdaptor(),
	new CHttpsAdaptor(),
	new COtherAdaptor(),
]

const checkAdaptor = async strUrl => {
	let strResult = strUrl

	for (let adaptor of arrAdaptors) {
		if (adaptor.support(strUrl)) {
			strResult = await adaptor.resolve(strUrl)
			// console.log('ResourceDownLoadAdaptor2', strResult)
			break
		}
	}

	return strResult
}

export const ResourceDownLoadAdaptor = {
	apply: async strUrl => {
		const strResult = await checkAdaptor(strUrl)
		// console.log('ResourceDownLoadAdaptor3', strResult)
		return strResult
	},
}

export default ResourceDownLoadAdaptor

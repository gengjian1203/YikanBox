import ResourceDownLoadAdaptor from './ResourceDownLoadAdaptor'
/**
 * 资源加载器
 */
export default class ResourceManager {
	// 单例对象
	static _instance: ResourceManager
	static _mapResource: Map<any, any>

	constructor() {}

	static getInstance() {
		if (!this._instance) {
			this._instance = new ResourceManager()
			this._mapResource = new Map()
		}
		return this._instance
	}

	static async getUrl(strSourceUrl) {
		const strUrl = this._mapResource.get(strSourceUrl)
		// console.log('ResourceManager getUrl', strSourceUrl, strUrl)
		if (strUrl) {
			return strUrl
		} else {
			const strResult = await ResourceDownLoadAdaptor.apply(strSourceUrl)
			this._mapResource.set(strSourceUrl, strResult)
			// console.log('ResourceManager getUrl2', strResult)
			// console.log('ResourceManager getUrl3', this._mapResource)
			return strResult
		}
	}
}

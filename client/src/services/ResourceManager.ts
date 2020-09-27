import Config from '@/config/index'
import ResourceDownLoadAdaptor from './ResourceDownLoadAdaptor'

const arrAllResource = [
	'/avatar/button/add.png',
	'/avatar/button/delete.png',
	'/avatar/button/flip.png',
	'/avatar/button/resize.png',
	'/avatar/default.png',
	'/avatar/jewelry/hongdian.png',
	'/avatar/jewelry/shanchu.png',
	'/avatar/jewelry/shengdanlaoren.png',
	'/avatar/jewelry/shengdanmao.png',
	'/avatar/jewelry/shengdanshu.png',
	'/avatar/jewelry/xueren.png',
	'/avatar/eg/hongdian.jpg',
	'/avatar/eg/shanchu.jpg',
	'/banner/banner_00.jpg',
	'/banner/banner_01.jpg',
	'/banner/banner_02.jpg',
	'/banner/banner_03.jpg',
	'/common/empty.png',
	'/common/share.jpg',
	'/mine/badge_01.png',
	'/mine/badge_02.png',
	'/mine/badge_03.png',
	'/mine/badge_04.png',
	'/mine/badge_05.png',
	'/mine/badge_06.png',
	'/mine/badge_07.png',
	'/mine/border_01.png',
	'/mine/border_02.png',
	'/mine/border_03.png',
	'/mine/border_04.png',
	'/mine/border_05.png',
	'/mine/border_06.png',
	'/mine/border_07.png',
	'/share/share_01.jpg',
	'/share/share_02.jpg',
	'/share/share_03.jpg',
	'/share/share_04.jpg',
	'/share/share_05.jpg',
]
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

	static loadingAllResource() {
		for (let item of arrAllResource) {
			this.getUrl(Config.cloudPath + item)
		}
	}

	static getStaticUrl(strSourceUrl) {
		if (strSourceUrl.startsWith('http://tmp/')) {
			return strSourceUrl
		} else {
			const strUrl = this._mapResource.get(strSourceUrl)
			// console.log('getStaticUrl', strSourceUrl, this._mapResource, strUrl)
			if (strUrl) {
				return strUrl
			} else {
				setTimeout(async () => {
					const strResult = await ResourceDownLoadAdaptor.apply(strSourceUrl)
					this._mapResource.set(strSourceUrl, strResult)
					// console.log('ResourceManager getUrl3', this._mapResource)
				}, 0)
				return ''
			}
		}
	}

	static async getUrl(strSourceUrl) {
		if (strSourceUrl.startsWith('http://tmp/')) {
			return strSourceUrl
		} else {
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
}

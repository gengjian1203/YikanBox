import Taro from '@tarojs/taro'
import Config from '@/config/index'
import ResourceManager from './ResourceManager'

export default class AppInitDataService {
	// 单例对象
	static _instance: AppInitDataService

	constructor() {}

	static getInstance() {
		if (!this._instance) {
			this._instance = new AppInitDataService()
		}
		return this._instance
	}

	initCloudInfo = () => {
		// 初始化云函数
		Taro.cloud.init({
			env: Config.env,
		})
	}

	initResourceManager = () => {
		// 初始化资源管理器
		ResourceManager.getInstance()
		ResourceManager.loadingAllResource()
	}

	init() {
		console.log('AppInitService init start.')
		this.initCloudInfo()
		this.initResourceManager()
		console.log('AppInitService init done.')
	}
}

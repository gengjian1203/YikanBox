import Taro from '@tarojs/taro'
import Config from '@/config/index'
import StorageManager from '@/services/StorageManager'

const m_managerStorage = StorageManager.getInstance()

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
		const env = Config.prod ? 'online-z8369' : 'develop-0loik'
		// 初始化云函数
		Taro.cloud.init({
			env,
		})
	}

	init() {
		console.log('AppInitService init start.')
		this.initCloudInfo()
		console.log('AppInitService init done.')
	}
}

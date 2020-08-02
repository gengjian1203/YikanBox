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

	initSystemInfo = () => {
		// 初始化获取系统信息
		Taro.getSystemInfo({
			success: res => {
				console.log('AppInitDataService getSystemInfo', res)
				m_managerStorage.setStorageSync('objSystemInfo', res)
			},
			fail: err => {
				console.error('AppInitDataService getSystemInfo', err)
				m_managerStorage.setStorageSync('objSystemInfo', err)
			},
		})
	}

	initAppInfo = () => {}

	initCloudInfo = () => {
		const env = Config.prod ? 'online-z8369' : 'develop-0loik'
		// 初始化云函数
		Taro.cloud.init({
			env,
		})
	}

	init() {
		console.log('AppInitDataService init start.')
		this.initSystemInfo()
		this.initAppInfo()
		this.initCloudInfo()
		console.log('AppInitDataService init done.')
	}
}

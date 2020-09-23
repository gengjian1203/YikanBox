import Taro from '@tarojs/taro'
import StorageManager from '@/services/StorageManager'

const m_managerStorage = StorageManager.getInstance()

const callFunction: any = async (strCloudName: string, objCloudParams: any) => {
	const isBlockMember = m_managerStorage.getStorageSync('isBlackMember')
	if (!isBlockMember) {
		return new Promise((resolve, reject) => {
			Taro.cloud
				.callFunction({
					name: strCloudName,
					data: objCloudParams,
				})
				.then(res => {
					resolve(res.result)
				})
				.catch(err => {
					reject(err)
				})
		})
	} else {
		return { data: null }
	}
}

export default {
	callFunction,
}

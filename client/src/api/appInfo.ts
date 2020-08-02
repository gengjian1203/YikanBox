import CloudFetch from '@/services/CloudFetch'

/**
 * 测试接口
 * @return 小程序级别配置信息
 */
const queryAppInfo = async (params?: any) => {
	return await CloudFetch.callFunction('login', params)
}

export default {
	queryAppInfo,
}

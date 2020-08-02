import CloudFetch from '@/services/CloudFetch'

/**
 * 测试接口
 * @return 小程序级别配置信息
 */
const queryAppInfo = async (params?: any) => {
	const res = await CloudFetch.callFunction('fetchAppInfo', params)
	return res.data.data[0]
}

export default {
	queryAppInfo,
}

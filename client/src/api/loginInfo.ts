import CloudFetch from '@/services/CloudFetch'

/**
 * 查询小程序信息以及用户信息
 * @return 小程序级别配置信息
 */
const queryLoginInfo = async () => {
	const params = {
		type: 'LOGIN',
	}
	const res = await CloudFetch.callFunction('fetchInfo', params)
	console.log('queryLoginInfo', res)
	return res.data
}

export default {
	queryLoginInfo,
}

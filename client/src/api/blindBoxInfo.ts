import CloudFetch from '@/services/CloudFetch'

interface IQueryBlindBoxInfoType {}
/**
 * 查询盲盒列表信息
 * @return
 */
const queryBlindBoxInfo = async (objParams?: IQueryBlindBoxInfoType) => {
	const params = {
		type: 'QUERY_BLIND_BOX_INFO',
		data: objParams,
	}
	const res = await CloudFetch.callFunction('fetchBlindBoxInfo', params)
	console.log('queryBlindBoxInfo', res)
	return res.data
}

export default {
	queryBlindBoxInfo,
}

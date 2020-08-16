import CloudFetch from '@/services/CloudFetch'

interface IQueryArticleInfoType {
	nPageNum?: number // 起始页码
	nPageSize?: number // 每页条数
}
/**
 * 新增注册成员信息
 * @return
 */
const queryArticleInfo = async (objParams?: IQueryArticleInfoType) => {
	const params = {
		type: 'QUERY',
		data: objParams,
	}
	const res = await CloudFetch.callFunction('fetchArticleInfo', params)
	console.log('queryArticleInfo', res)
	return res.data
}

export default {
	queryArticleInfo,
}

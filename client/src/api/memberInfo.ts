import CloudFetch from '@/services/CloudFetch'

interface IAddMemberInfoType {
	openid: string
	nickName: string // 昵称
	avatarUrl: string // 头像
	gender: number // 性别
	country: string // 国家
	province: string // 省份
	city: string // 城市
	language: string // 语言
}
/**
 * 新增注册成员信息
 * @return
 */
const addMemberInfo = async (objParams?: IAddMemberInfoType) => {
	const params = {
		type: 'ADD',
		data: objParams,
	}
	const res = await CloudFetch.callFunction('fetchMemberInfo', params)
	console.log('addMemberInfo', res)
	return res.data
}

export default {
	addMemberInfo,
}

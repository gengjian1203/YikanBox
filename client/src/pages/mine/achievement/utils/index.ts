import * as imagesLocal from '@/services/ResourceImage'

const arrBadgeListTemplate = [
	{
		code: 'BADGE_STAR',
		urlBadge: imagesLocal.strUrlImageMineBadge01,
		urlBorder: imagesLocal.strUrlImageMineBorder01,
		name: '明日之星',
		describe: '登录即可激活',
		time: '',
	},
	{
		code: 'BADGE_RAINBOW',
		urlBadge: imagesLocal.strUrlImageMineBadge02,
		urlBorder: imagesLocal.strUrlImageMineBorder02,
		name: '七彩虹光',
		describe: '收藏7篇文章即可激活',
		time: '',
	},
	{
		code: 'BADGE_SNOW',
		urlBadge: imagesLocal.strUrlImageMineBadge03,
		urlBorder: imagesLocal.strUrlImageMineBorder03,
		name: '冰雪精灵',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_SPRING',
		urlBadge: imagesLocal.strUrlImageMineBadge04,
		urlBorder: imagesLocal.strUrlImageMineBorder04,
		name: '春意盎然',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_CHILD',
		urlBadge: imagesLocal.strUrlImageMineBadge05,
		urlBorder: imagesLocal.strUrlImageMineBorder05,
		name: '童年记忆',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_RICH',
		urlBadge: imagesLocal.strUrlImageMineBadge06,
		urlBorder: imagesLocal.strUrlImageMineBorder06,
		name: '恭喜发财',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
]

/**
 * 处理徽章（头像框）List，如果已获取则赋值time字段。
 * @param data_arrMineBadgeList 已获得徽章（头像框）的数据列表
 */
export const convertBadgeList = (data_arrMineBadgeList: Array<any>) => {
	const arrBadgeListTmp = arrBadgeListTemplate.map(item => {
		const nIndex = data_arrMineBadgeList.findIndex(itemMine => {
			return itemMine.code === item.code
		})
		return {
			...item,
			time: nIndex >= 0 ? data_arrMineBadgeList[nIndex].time : '',
		}
	})
	// console.log('convertBadgeList', arrBadgeListTmp)
	return arrBadgeListTmp
}

/**
 * 根据徽章Code解析徽章名称
 * @param strBadgeCode 徽章Code
 */
export const getBadgeName = (strBadgeCode: string) => {
	let strResult = '不使用头像框'
	const nIndex = arrBadgeListTemplate.findIndex(item => {
		return item.code === strBadgeCode
	})
	if (nIndex >= 0) {
		strResult = arrBadgeListTemplate[nIndex].name
	}
	return strResult
}

/**
 * 检验是否满足激活徽章的条件
 * @param objBadge 待激活徽章数据
 * @param store Redux仓库
 */
export const checkBadgeActivate = (objBadge: any, store: any) => {
	// console.log('checkBadgeActivate', objBadge, store)
	let isResult = false
	switch (objBadge.code) {
		// 登录即可激活
		case 'BADGE_STAR':
			isResult = true
			break
		// 收藏7篇文章即可激活
		case 'BADGE_RAINBOW':
			isResult = store.memberInfo.data_arrCollectionArticleList.length >= 7
			break
		// 仿佛隐藏着些许的秘密
		case 'BADGE_SNOW':
			isResult = false
			break
		// 仿佛隐藏着些许的秘密
		case 'BADGE_SPRING':
			isResult = false
			break
		// 仿佛隐藏着些许的秘密
		case 'BADGE_CHILD':
			isResult = false
			break
		// 仿佛隐藏着些许的秘密
		case 'BADGE_RICH':
			isResult = false
			break
		default:
			isResult = false
			break
	}
	// isResult = true
	return isResult
}

export default {
	convertBadgeList,
	getBadgeName,
	checkBadgeActivate,
}

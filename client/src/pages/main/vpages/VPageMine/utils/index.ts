import * as imagesLocal from '@/services/ResourceImage'

const arrBadgeListTemplate = [
	{
		code: 'BADGE_STAR',
		urlBadge: imagesLocal.strUrlImageMineBadge01,
		urlBorder: imagesLocal.strUrlImageMineBorder01,
		name: '明日之星',
		describe: '签到数满3天即可获得',
		time: '',
	},
	{
		code: 'BADGE_RAINBOW',
		urlBadge: imagesLocal.strUrlImageMineBadge02,
		urlBorder: imagesLocal.strUrlImageMineBorder02,
		name: '七彩虹光',
		describe: '连续签到7天即可获得',
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
 * 根据徽章Code解析徽章图片Url
 * @param strBadgeCode 徽章Code
 */
export const getBadgeUrl = (strBadgeCode: string) => {
	let strResult = ''
	const nIndex = arrBadgeListTemplate.findIndex(item => {
		return item.code === strBadgeCode
	})
	if (nIndex >= 0) {
		strResult = arrBadgeListTemplate[nIndex].urlBorder
	}
	return strResult
}

export default {
	getBadgeUrl,
}

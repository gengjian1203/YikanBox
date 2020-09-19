import Config from '@/config/index'

const strBadgeUrl_01 = Config.cloudPath + '/mine/badge_01.png'
const strBadgeUrl_02 = Config.cloudPath + '/mine/badge_02.png'
const strBadgeUrl_03 = Config.cloudPath + '/mine/badge_03.png'
const strBadgeUrl_04 = Config.cloudPath + '/mine/badge_04.png'
const strBadgeUrl_05 = Config.cloudPath + '/mine/badge_05.png'
const strBadgeUrl_06 = Config.cloudPath + '/mine/badge_06.png'
const strBadgeUrl_07 = Config.cloudPath + '/mine/badge_07.png'

const strBorderUrl_01 = Config.cloudPath + '/mine/border_01.png'
const strBorderUrl_02 = Config.cloudPath + '/mine/border_02.png'
const strBorderUrl_03 = Config.cloudPath + '/mine/border_03.png'
const strBorderUrl_04 = Config.cloudPath + '/mine/border_04.png'
const strBorderUrl_05 = Config.cloudPath + '/mine/border_05.png'
const strBorderUrl_06 = Config.cloudPath + '/mine/border_06.png'
const strBorderUrl_07 = Config.cloudPath + '/mine/border_07.png'

const arrBadgeListTemplate = [
	{
		code: 'BADGE_STAR',
		urlBadge: strBadgeUrl_01,
		urlBorder: strBorderUrl_01,
		name: '明日之星',
		describe: '签到数满3天即可获得',
		time: '',
	},
	{
		code: 'BADGE_RAINBOW',
		urlBadge: strBadgeUrl_02,
		urlBorder: strBorderUrl_02,
		name: '七彩虹光',
		describe: '连续签到7天即可获得',
		time: '',
	},
	{
		code: 'BADGE_SNOW',
		urlBadge: strBadgeUrl_03,
		urlBorder: strBorderUrl_03,
		name: '冰雪精灵',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_SPRING',
		urlBadge: strBadgeUrl_04,
		urlBorder: strBorderUrl_04,
		name: '春意盎然',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_CHILD',
		urlBadge: strBadgeUrl_05,
		urlBorder: strBorderUrl_05,
		name: '童年记忆',
		describe: '仿佛隐藏着些许的秘密',
		time: '',
	},
	{
		code: 'BADGE_RICH',
		urlBadge: strBadgeUrl_06,
		urlBorder: strBorderUrl_06,
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

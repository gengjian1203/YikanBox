import strBadgeUrl_01 from '@/images/mine/badge_01.png'
import strBadgeUrl_02 from '@/images/mine/badge_02.png'
import strBadgeUrl_03 from '@/images/mine/badge_03.png'
import strBadgeUrl_04 from '@/images/mine/badge_04.png'
import strBadgeUrl_05 from '@/images/mine/badge_05.png'
import strBadgeUrl_06 from '@/images/mine/badge_06.png'
// import strBadgeUrl_07 from '@/images/mine/badge_07.png'

import strBorderUrl_01 from '@/images/mine/border_01.png'
import strBorderUrl_02 from '@/images/mine/border_02.png'
import strBorderUrl_03 from '@/images/mine/border_03.png'
import strBorderUrl_04 from '@/images/mine/border_04.png'
import strBorderUrl_05 from '@/images/mine/border_05.png'
import strBorderUrl_06 from '@/images/mine/border_06.png'
// import strBorderUrl_07 from '@/images/mine/border_07.png'

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

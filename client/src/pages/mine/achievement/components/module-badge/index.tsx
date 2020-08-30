import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import { deepClone } from '@/utils/index'

import { View, Image } from '@tarojs/components'
import { AtCurtain, AtButton } from 'taro-ui'
import ModuleTitle from '@/components/ModuleTitle'

import strBadgeUrl_01 from '@/images/mine/badge_01.png'
import strBadgeUrl_02 from '@/images/mine/badge_02.png'
import strBadgeUrl_03 from '@/images/mine/badge_03.png'
import strBadgeUrl_04 from '@/images/mine/badge_04.png'
import strBadgeUrl_05 from '@/images/mine/badge_05.png'
import strBadgeUrl_06 from '@/images/mine/badge_06.png'
// import strBadgeUrl_07 from '@/images/mine/badge_07.png'

import ItemBadge from '../item-badge'

import './index.scss'

interface IModuleBadgeProps {
	isStateMyself: boolean // 是否为自己
	memberInfo: any // 用户信息
}

export default function ModuleBadge(props: IModuleBadgeProps) {
	const {} = props

	// const [isShowCurtainBadge, setShowCurtainBadge] = useState<boolean>(false)
	const [nSelectBadgeIndex, setSelectBadgeIndex] = useState<number>(-1)
	const [objSelectBadge, setSelectBadge] = useState<any>({})
	const [arrBadgeList, setBadgeList] = useState<Array<any>>([])

	const memberInfo = useSelector(state => state.memberInfo)

	const { pushMineBadgeList } = useActions(memberInfoActions)

	const arrBadgeListTemplate = [
		{
			code: 'BADGE_STAR',
			url: strBadgeUrl_01,
			name: '明日之星',
			describe: '签到数满3天即可获得',
			time: '',
		},
		{
			code: 'BADGE_RAINBOW',
			url: strBadgeUrl_02,
			name: '七彩虹光',
			describe: '连续签到7天即可获得',
			time: '',
		},
		{
			code: 'BADGE_SNOW',
			url: strBadgeUrl_03,
			name: '冰雪精灵',
			describe: '仿佛隐藏着些许的秘密',
			time: '',
		},
		{
			code: 'BADGE_SPRING',
			url: strBadgeUrl_04,
			name: '春意盎然',
			describe: '仿佛隐藏着些许的秘密',
			time: '',
		},
		{
			code: 'BADGE_CHILD',
			url: strBadgeUrl_05,
			name: '童年记忆',
			describe: '仿佛隐藏着些许的秘密',
			time: '',
		},
		{
			code: 'BADGE_RICH',
			url: strBadgeUrl_06,
			name: '恭喜发财',
			describe: '仿佛隐藏着些许的秘密',
			time: '',
		},
	]

	const renderBadgeList = async () => {
		const data_arrMineBadgeList = memberInfo.data_arrMineBadgeList
		const arrBadgeListTmp = arrBadgeListTemplate.map(item => {
			const nIndex = data_arrMineBadgeList.findIndex(itemMine => {
				return itemMine.code === item.code
			})
			return {
				...item,
				time: nIndex >= 0 ? data_arrMineBadgeList[nIndex].time : '',
			}
		})
		console.log('ModuleBadge', arrBadgeListTmp)

		setBadgeList(arrBadgeListTmp)
	}

	useEffect(() => {
		console.log('Watch data_arrMineBadgeList.')
		renderBadgeList()
		return () => {}
	}, [memberInfo.data_arrMineBadgeList])

	useEffect(() => {
		console.log('Watch nSelectBadgeIndex.', nSelectBadgeIndex)
		if (nSelectBadgeIndex >= 0) {
			setSelectBadge(arrBadgeList[nSelectBadgeIndex])
		}
	}, [nSelectBadgeIndex, arrBadgeList])

	// 点击徽章
	const handleItemClick = item => {
		console.log('handleItemClick', item)
		const nIndex = arrBadgeList.findIndex(itemList => {
			return itemList.code === item.code
		})
		setSelectBadgeIndex(nIndex)
	}

	// 点击徽章详情
	const handleItemButtonClick = item => {
		console.log('handleItemButtonClick', item)
		const nIndex = arrBadgeList.findIndex(itemList => {
			return itemList.code === item.code
		})
		setSelectBadgeIndex(nIndex)
	}

	// 关闭徽章
	const handleCurtainClose = () => {
		console.log('handleCurtainClose')
		setSelectBadgeIndex(-1)
	}

	// 激活徽章
	const handleItemActivateClick = () => {
		console.log('handleItemActivateClick', objSelectBadge)
		pushMineBadgeList({
			code: objSelectBadge.code,
			time: '111111',
		})
	}

	return (
		<View className='module-badge-wrap'>
			<ModuleTitle strTitle='徽章墙' />
			<View className='module-badge-content'>
				{arrBadgeList.map((item, index) => {
					return (
						<ItemBadge
							key={index}
							objBadge={item}
							onItemClick={handleItemClick}
							onItemButtonClick={handleItemButtonClick}
						/>
					)
				})}
			</View>
			{/* 幕帘弹窗 */}
			<AtCurtain
				isOpened={nSelectBadgeIndex >= 0}
				closeBtnPosition='bottom'
				onClose={handleCurtainClose}
			>
				<View className='module-curtain-content'>
					<Image
						src={objSelectBadge.url}
						mode='aspectFit'
						className={
							`curtain-image ` +
							`${objSelectBadge.time === '' ? 'curtain-gray ' : ''}`
						}
					/>
					<View className='curtain-desc'>
						获取方法：{objSelectBadge.describe}
					</View>
					<View
						className={
							`curtain-time ` +
							`{${objSelectBadge.time === '' ? 'hidden ' : ''}}`
						}
					>
						获取时间：{objSelectBadge.time}
					</View>
					<AtButton
						className={
							`curtain-button ` +
							`{${objSelectBadge.time === '' ? '' : 'hidden '}}`
						}
						type='primary'
						size='small'
						onClick={useThrottle(handleItemActivateClick)}
					>
						激活
					</AtButton>
				</View>
			</AtCurtain>
		</View>
	)
}

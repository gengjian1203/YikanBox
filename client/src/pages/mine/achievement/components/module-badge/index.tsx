import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { View } from '@tarojs/components'
import { AtCurtain } from 'taro-ui'
import ModuleTitle from '@/components/ModuleTitle'

import { convertBadgeList } from '../../utils/index'
import ItemBadge from '../item-badge'
import ModuleBadgeCurtain from '../module-badge-curtain'

import './index.scss'

interface IModuleBadgeProps {
	isStateMyself: boolean // 是否为自己
	objMemberInfo: any // 用户信息
}

export default function ModuleBadge(props: IModuleBadgeProps) {
	const { isStateMyself = true, objMemberInfo = {} } = props

	const [nSelectBadgeIndex, setSelectBadgeIndex] = useState<number>(-1)
	const [objSelectBadge, setSelectBadge] = useState<any>({})
	const [arrBadgeList, setBadgeList] = useState<Array<any>>([])

	const memberInfo = useSelector(state => state.memberInfo)

	const renderBadgeList = arrList => {
		setBadgeList(convertBadgeList(arrList))
	}

	// 自己的成就，监听Redux数据
	useEffect(() => {
		if (isStateMyself) {
			console.log('Watch renderBadgeList.myself')
			renderBadgeList(memberInfo.data_arrMineBadgeList)
		}
	}, [memberInfo.data_arrMineBadgeList])

	// 他人的成就，监听传入数据
	useEffect(() => {
		if (!isStateMyself) {
			console.log('Watch renderBadgeList.not myself')
			renderBadgeList(objMemberInfo.data_arrMineBadgeList)
		}
	}, [objMemberInfo.data_arrMineBadgeList])

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

	// 关闭徽章
	const handleCurtainClose = () => {
		console.log('handleCurtainClose')
		setSelectBadgeIndex(-1)
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
				<ModuleBadgeCurtain objBadge={objSelectBadge} />
			</AtCurtain>
		</View>
	)
}

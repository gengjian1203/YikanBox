import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import avatarShowInfoActions from '@/redux/actions/avatarShowInfo'
import { UUID } from '@/utils/index'
import ResourceManager from '@/services/ResourceManager'

import { View, Image, ScrollView } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane } from 'taro-ui'

import { CANVAS_WIDTH, CANVAS_HEIGHT, arrJewelryList } from '../../utils/const'

import './index.scss'

interface IModuleJewelryProps {
	content?: string
}

export default function ModuleJewelry(props: IModuleJewelryProps) {
	const {} = props

	const [isShowJewelryState, setShowJewelryState] = useState<boolean>(true)
	const [nTabCurrent, setTabCurrent] = useState<number>(0)

	const { initAvatarInfo, addAvatarJewelry } = useActions(avatarShowInfoActions)

	// 撤销操作
	const handleJewelryBackClick = () => {}

	// 重复操作
	const handleJewelryReturnClick = () => {}

	// 清除饰品的所有操作
	const handleJewelryCleanClick = () => {
		Taro.showModal({
			title: '提示',
			content: '是否要清除所有装饰？',
			success: res => {
				if (res.confirm) {
					initAvatarInfo()
				}
			},
		})
	}

	// 切换饰品栏展示/隐藏状态
	const handleJewelryStateSwitch = () => {
		setShowJewelryState(prevState => {
			return !prevState
		})
	}

	// 点击饰品
	const handleJewelryCellClick = async item => {
		// console.log('handleJewelryCellClick', item)
		const nRandomX = Math.random() * CANVAS_WIDTH - item.rect.width
		const nRandomY = Math.random() * CANVAS_HEIGHT - item.rect.height
		const objJewelry = {
			...item,
			id: UUID(),
			rect: {
				...item.rect,
				x:
					item.rect.x !== undefined ? item.rect.x : nRandomX < 0 ? 0 : nRandomX,
				y:
					item.rect.y !== undefined ? item.rect.y : nRandomY < 0 ? 0 : nRandomY,
			},
			value: await ResourceManager.getUrl(item.value),
		}
		addAvatarJewelry(objJewelry)
	}

	// 切换tab
	const handleSelectTabClick = current => {
		// console.log('handleSelectTabClick', current)
		setTabCurrent(current)
	}

	// 渲染饰品单元
	const renderJewelryCell = itemCell => {
		switch (itemCell.type) {
			case 'TEXT':
				return <View className='content-text'>{itemCell.value}</View>
			case 'IMAGE':
				return (
					<Image
						src={itemCell.valueEG ? itemCell.valueEG : itemCell.value}
						mode='widthFix'
					/>
				)
			default:
				return <View>{itemCell.value}</View>
		}
	}

	return (
		<View
			className={
				`avatar-show-jewelry ` +
				`${
					isShowJewelryState
						? 'fade-in-from-bottom-avatar-show-jewelry-header'
						: 'fade-out-from-bottom-avatar-show-jewelry-header'
				}`
			}
		>
			{/* 操作区 */}
			<View className='jewelry-header'>
				<View className='header-module'>
					<AtButton
						type='secondary'
						circle
						size='small'
						disabled={true}
						className='header-item flex-center iconfont icon-arrow-back'
						onClick={handleJewelryBackClick}
					/>
					<AtButton
						type='secondary'
						circle
						size='small'
						className='header-item flex-center iconfont icon-arrow-return'
						onClick={handleJewelryReturnClick}
					/>
					<AtButton
						type='secondary'
						circle
						size='small'
						className='header-item flex-center iconfont icon-arrow-clean'
						onClick={handleJewelryCleanClick}
					/>
				</View>
				<View className='header-module'>
					<AtButton
						type='secondary'
						circle
						size='small'
						className={
							`header-item ` +
							`flex-center ` +
							`iconfont ` +
							`${isShowJewelryState ? 'icon-arrow-down ' : 'icon-arrow-up '}`
						}
						onClick={handleJewelryStateSwitch}
					/>
				</View>
			</View>
			{/* 饰品区 */}

			<AtTabs
				tabList={arrJewelryList}
				current={nTabCurrent}
				// scroll
				onClick={handleSelectTabClick}
			>
				{arrJewelryList.map((itemTab, indexTab) => {
					return (
						<AtTabsPane key={indexTab} current={nTabCurrent} index={indexTab}>
							<ScrollView className='jewelry-content' scrollX>
								{itemTab.list.map((itemCell, indexCell) => {
									return (
										<View
											key={indexCell}
											className='jewelry-item flex-center'
											onClick={() => handleJewelryCellClick(itemCell)}
										>
											<View className='item-content flex-center'>
												{renderJewelryCell(itemCell)}
											</View>
										</View>
									)
								})}
							</ScrollView>
						</AtTabsPane>
					)
				})}
			</AtTabs>
		</View>
	)
}

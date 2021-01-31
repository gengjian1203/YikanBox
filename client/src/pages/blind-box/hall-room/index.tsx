import React, { Fragment, useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import Taro, { useRouter } from '@tarojs/taro'
import webApi from '@/api'
import { View, Image } from '@tarojs/components'
import PageContent from '@/components/page-content'
import ButtonIcon from '@/components/button-icon'
import PanelShare from '@/components/panel-share'
import useQueryPageList from '@/hooks/useQueryPageList'
import * as imagesLocal from '@/services/ResourceImage'
import { shareType, processSharePath } from '@/utils/index'
import StorageManager from '@/services/StorageManager'

import './index.scss'

const m_managerStorage = StorageManager.getInstance()

export default function HallRoom() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [isShowPanelShare, setShowPanelShare] = useState<boolean>(false) // 是否展示分享面板
	const [arrBoxList, setBoxList] = useState<Array<any>>()

	useEffect(() => {
		Taro.hideShareMenu()
	}, [])

	useQueryPageList(
		res => {
			const { state, list } = res
			console.log('queryBlindBoxInfo', list)
			switch (state) {
				case 'RESULT':
					setBoxList(list)
					setLoadComplete(true)
					break
				default:
					break
			}
		},
		webApi.blindBoxInfo.queryBlindBoxInfo,
		{}
	)

	const handleBoxClick = item => {
		console.log('handleBoxClick', item)
		m_managerStorage.setStorageSync('blind-box-select', item)
		Taro.navigateTo({
			url:
				`/pages/blind-box/box-select/index` +
				`?title=${encodeURIComponent(item.title)}`,
		})
	}

	const handleShareClick = e => {
		console.log('handleShareClick')
		setShowPanelShare(true)
	}

	const handleHistoryListClick = e => {
		e.stopPropagation()
		console.log('handleHistoryListClick')
		Taro.navigateTo({
			url: `/pages/blind-box/box-list/index`,
		})
	}

	// 分享弹窗反馈
	const handleShowPanelShare = isShow => {
		setShowPanelShare(isShow)
	}

	return (
		<PageContent
			customClass='hall-room-wrap'
			isShowLeftIcon
			strNavigationTitle='盲盒大厅'
		>
			{isLoadComplete ? (
				<Fragment>
					{/* 盲盒列表 */}
					{arrBoxList &&
						arrBoxList.map((item, index) => (
							<AtButton
								key={index}
								className='box-wrap'
								onClick={() => handleBoxClick(item)}
							>
								<View className='flex-center-v box-item'>
									<Image
										src={item.poster}
										mode='aspectFill'
										className='box-img'
									/>
									<View className='flex-start-v box-content'>
										<View className='text-justify box-text box-title'>
											{item.title}
										</View>
										<View className='text-justify box-text box-desc'>
											{item.desc}
										</View>
									</View>
								</View>
							</AtButton>
						))}
					{/* 按钮 */}
					<View className='flex-between-v float-button'>
						<ButtonIcon
							value='iconresonserate'
							width={100}
							height={100}
							radius={100}
							size={50}
							color='var(--color-gray-2)'
							onClick={handleShareClick}
						/>
						<View className='block-line'></View>
						<ButtonIcon
							value='iconicon--copy'
							width={100}
							height={100}
							radius={100}
							size={50}
							color='var(--color-gray-2)'
							onClick={handleHistoryListClick}
						/>
					</View>

					{/* 分享面板 */}
					<PanelShare
						isShowPanelShare={isShowPanelShare}
						strShareTitle='这里有好多盲盒抽奖，快过来一起丫~'
						strShareImage={imagesLocal.strUrlImageCommonShare}
						strSharePath={processSharePath({
							sharePath: path,
							shareType: shareType.PATH_BLIND.name,
						})}
						strContentUrl={imagesLocal.strUrlImageCommonShare}
						onShowPanelShare={handleShowPanelShare}
					/>
				</Fragment>
			) : (
				<View className='flex-center-v '>加载中...</View>
			)}
		</PageContent>
	)
}

import React, { Fragment, useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import Taro, { useRouter } from '@tarojs/taro'
import webApi from '@/api'
import { View, Image } from '@tarojs/components'
import PageContent from '@/components/page-content'
import ButtonIcon from '@/components/button-icon'
import useQueryPageList from '@/hooks/useQueryPageList'

import StorageManager from '@/services/StorageManager'

import './index.scss'

const m_managerStorage = StorageManager.getInstance()

export default function HallRoom() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
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

	const handleHistoryListClick = e => {
		e.stopPropagation()
		console.log('handleHistoryListClick')
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
					<View className='float-button'>
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
				</Fragment>
			) : (
				<View className='flex-center-v '>加载中...</View>
			)}
		</PageContent>
	)
}

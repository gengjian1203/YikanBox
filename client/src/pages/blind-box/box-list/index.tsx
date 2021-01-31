import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import webApi from '@/api'
import { View, Image } from '@tarojs/components'
import PageContent from '@/components/page-content'
import PanelTips from '@/components/panel-tips'
import useQueryPageList from '@/hooks/useQueryPageList'

import './index.scss'

export default function BoxList() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [arrBoxList, setBoxList] = useState<Array<any>>([])

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
		webApi.blindBoxInfo.queryBlindBoxList,
		{}
	)

	return (
		<PageContent
			customClass='box-list-wrap'
			isShowLeftIcon
			strNavigationTitle='抽取成果'
		>
			{isLoadComplete ? (
				arrBoxList.length === 0 ? (
					<View className='list-empty flex-center-v'>
						<PanelTips strType='EMPTY' />
					</View>
				) : (
					<Fragment>
						{arrBoxList.map((item, index) => (
							<View key={index} className='flex-center-h list-item'>
								<View className='flex-center-v item-left'>
									<Image
										src={item.url}
										mode='aspectFit'
										className='left-logo'
									/>
								</View>
								<View className='flex-center-v item-mid'>
									<View className='mid-title'>{item.title}</View>
								</View>
								<View className='flex-center-v item-right'>
									<View className='right-time'>{item.createTime}</View>
								</View>
							</View>
						))}
					</Fragment>
				)
			) : (
				<View className='flex-center-v '>加载中...</View>
			)}
		</PageContent>
	)
}

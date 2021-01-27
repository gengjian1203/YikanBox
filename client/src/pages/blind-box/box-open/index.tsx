import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import PageContent from '@/components/page-content'
import ButtonBottom from '@/components/button-bottom'

import './index.scss'

export default function BoxOpen() {
	const {
		path,
		params: { selectIndex = '', exclude = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [arrBoxList, setBoxList] = useState<Array<any>>([])

	useEffect(() => {
		Taro.hideShareMenu()
		setBoxList([
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '一一一',
			},
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '收拾啥',
			},
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '一一一',
			},
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '一一一',
			},
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '一一一',
			},
			{
				url:
					'https://bkimg.cdn.bcebos.com/pic/bd3eb13533fa828ba61e856697565634970a304eec57',
				title: '一一一',
			},
		])
		setLoadComplete(true)
	}, [])

	const handleButtonClick = e => {
		console.log('handleButtonClick', e)
	}

	return (
		<PageContent
			customClass='flex-center-v box-open-wrap'
			isShowLeftIcon
			strNavigationTitle={`${selectIndex}号盒子`}
		>
			{isLoadComplete && (
				<Fragment>
					<Image
						className='box-open-img'
						src='https://res.paquapp.com/boxonline/auto_new/series/3/28.png'
						mode='aspectFit'
					/>
					<ScrollView className='flex-start-h box-open-content' scrollX>
						{arrBoxList &&
							arrBoxList.map((item, index) => (
								<View key={index} className='flex-center-v box-item'>
									<Image
										className='box-item-img'
										src={item.url}
										mode='widthFix'
									/>
									<View className='flex-center-v box-item-name'>
										{item.title}
									</View>
								</View>
							))}
					</ScrollView>
					<ButtonBottom text='就决定是你了' onClick={handleButtonClick} />
				</Fragment>
			)}
		</PageContent>
	)
}

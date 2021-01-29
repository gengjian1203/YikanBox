import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import PageContent from '@/components/page-content'
import ButtonBottom from '@/components/button-bottom'
import StorageManager from '@/services/StorageManager'
import './index.scss'

const m_managerStorage = StorageManager.getInstance()
export default function BoxOpen() {
	const {
		path,
		params: { selectIndex = '', exclude = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [imgBox, setImgBox] = useState<string>('')
	const [arrBoxList, setBoxList] = useState<Array<any>>([])

	useEffect(() => {
		Taro.hideShareMenu()
		const blindBoxSelect: any = m_managerStorage.getStorageSync(
			'blind-box-select'
		)
		setImgBox(blindBoxSelect.imgBox)
		setBoxList(blindBoxSelect.boxes)
		setLoadComplete(true)
	}, [])

	const handleButtonClick = e => {
		console.log('handleButtonClick', e)
		Taro.eventCenter.trigger('box-exclude-append', {
			selectIndex,
			value: String(Math.floor(Math.random() * 12)),
		})
	}

	return (
		<PageContent
			customClass='flex-center-v box-open-wrap'
			isShowLeftIcon
			strNavigationTitle={`${selectIndex}号盒子`}
		>
			{isLoadComplete && (
				<Fragment>
					<Image className='box-open-img' src={imgBox} mode='aspectFit' />
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

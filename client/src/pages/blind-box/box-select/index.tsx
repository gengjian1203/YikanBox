import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'
import PageContent from '@/components/page-content'

import './index.scss'

export default function BoxSelect() {
	const {
		path,
		params: { title = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [strNavigationTitle, setNavigationTitle] = useState<string>(
		decodeURIComponent(title)
	)
	const [exclude, setExclude] = useState<any>({ 2: '4' })

	const strUrlBoxNew =
		'https://res.paquapp.com/boxonline/auto_new/series/5/495.png'
	const strUrlBoxOld =
		'https://res.paquapp.com/boxonline/auto_new/series/5/496.png'

	useEffect(() => {
		Taro.hideShareMenu()
		setLoadComplete(true)
	}, [])

	const handleBoxClick = item => {
		console.log('handleBoxClick', item)
		if (exclude[item]) {
			return
		}
		Taro.navigateTo({
			url:
				`/pages/blind-box/box-open/index` +
				`?selectIndex=${item}` +
				`&exclude=${JSON.stringify(exclude)}`,
		})
	}

	return (
		<PageContent
			customClass='flex-center-v box-select-wrap'
			isShowLeftIcon
			strNavigationTitle={strNavigationTitle}
		>
			{isLoadComplete && (
				<Fragment>
					<Image
						className='box-select-img'
						src='https://res.paquapp.com/boxonline/auto_new/series/3/28.png'
						mode='aspectFit'
					/>
					<View className='box-select-content'>
						{[
							'1',
							'2',
							'3',
							'4',
							'5',
							'6',
							'7',
							'8',
							'9',
							'10',
							'11',
							'12',
						].map((item, index) => (
							<View className='box-item' key={index}>
								<ButtonIcon
									value={exclude[item] ? strUrlBoxOld : strUrlBoxNew}
									width={160}
									height={160}
									radius={0}
									onClick={() => handleBoxClick(item)}
								/>
								<View className='box-sign'></View>
								<View className='flex-center-v box-number'>{item}</View>
							</View>
						))}
					</View>
					<View className='flex-center-v box-select-text'>
						选一个你喜欢的宝宝领回家吧~
					</View>
				</Fragment>
			)}
		</PageContent>
	)
}

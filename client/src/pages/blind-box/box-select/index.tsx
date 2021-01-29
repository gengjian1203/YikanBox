import React, { Fragment, useEffect, useState, useCallback } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'
import PageContent from '@/components/page-content'

import { deepClone } from '@/utils/index'
import StorageManager from '@/services/StorageManager'

import './index.scss'

const m_managerStorage = StorageManager.getInstance()

export default function BoxSelect() {
	const {
		path,
		params: { title = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [strNavigationTitle, setNavigationTitle] = useState<string>(
		decodeURIComponent(title)
	)
	const [strUrlBoxNew, setUrlBoxNew] = useState<string>('')
	const [strUrlBoxOld, setUrlBoxOld] = useState<string>('')
	const [imgBox, setImgBox] = useState<string>('')
	const [arrBoxList, setBoxList] = useState<Array<any>>([])
	const [exclude, setExclude] = useState<any>({})

	const handleBoxExcludeAppend = e => {
		console.log('handleBoxExcludeAppend', e)

		setExclude(prevExclude => {
			const excludeTmp = deepClone(prevExclude)
			excludeTmp[parseInt(e.selectIndex)] = e.value
			return excludeTmp
		})
	}

	useEffect(() => {
		Taro.hideShareMenu()

		// setExclude({ '3': '2', '2': '1' })
		const blindBoxSelect: any = m_managerStorage.getStorageSync(
			'blind-box-select'
		)
		setUrlBoxNew(blindBoxSelect.newBox)
		setUrlBoxOld(blindBoxSelect.oldBox)
		setImgBox(blindBoxSelect.imgBox)
		blindBoxSelect.boxes.pop()
		setBoxList(blindBoxSelect.boxes)
		Taro.eventCenter.on('box-exclude-append', handleBoxExcludeAppend)
		setLoadComplete(true)
		return () => {
			Taro.eventCenter.off('box-exclude-append')
		}
	}, [])

	const handleBoxClick = index => {
		console.log('handleBoxClick', index)
		if (exclude[index]) {
			return
		}
		Taro.navigateTo({
			url:
				`/pages/blind-box/box-open/index` +
				`?selectIndex=${index}` +
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
					<Image className='box-select-img' src={imgBox} mode='aspectFit' />
					<View className='box-select-content'>
						{arrBoxList.map((item, index) => (
							<View className='box-item' key={index}>
								<ButtonIcon
									value={exclude[index] ? strUrlBoxOld : strUrlBoxNew}
									width={160}
									height={160}
									radius={0}
									onClick={() => handleBoxClick(index)}
								/>
								<View className='box-sign'></View>
								<View className='flex-center-v box-number'>{index + 1}</View>
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

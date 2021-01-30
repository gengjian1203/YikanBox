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
	const [shaking, setShaking] = useState<any>({})

	// 追加拆过的盒子
	const handleBoxExcludeAppend = e => {
		console.log('handleBoxExcludeAppend', e)

		setExclude(prevExclude => {
			const excludeTmp = deepClone(prevExclude)
			excludeTmp[parseInt(e.selectIndex)] = e.value
			return excludeTmp
		})
	}

	// 追加摇过的盒子
	const handleBoxShakingAppend = e => {
		console.log('handleBoxShakingAppend', e)

		setShaking(prevShaking => {
			const shakingTmp = deepClone(prevShaking)
			if (!shakingTmp[parseInt(e.selectIndex)]) {
				shakingTmp[parseInt(e.selectIndex)] = []
			}
			shakingTmp[parseInt(e.selectIndex)].push(e.value)
			return shakingTmp
		})
	}

	useEffect(() => {
		Taro.hideShareMenu()

		const blindBoxSelect: any = m_managerStorage.getStorageSync(
			'blind-box-select'
		)
		setUrlBoxNew(blindBoxSelect.newBox)
		setUrlBoxOld(blindBoxSelect.oldBox)
		setImgBox(blindBoxSelect.imgBox)
		blindBoxSelect.boxes.pop()
		setBoxList(blindBoxSelect.boxes)
		Taro.eventCenter.on('box-exclude-append', handleBoxExcludeAppend)
		Taro.eventCenter.on('box-shaking-append', handleBoxShakingAppend)
		setLoadComplete(true)
		return () => {
			Taro.eventCenter.off('box-exclude-append')
			Taro.eventCenter.off('box-shaking-append')
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
				`&exclude=${JSON.stringify(exclude)}` +
				`&shaking=${JSON.stringify(shaking)}`,
		})
	}

	const handleResetClick = () => {
		console.log('handleResetClick')
		Taro.showModal({
			title: '提示',
			content: '确定要换一批盒子么？',
			success: async res => {
				if (res.confirm) {
					setExclude({})
					setShaking({})
				}
			},
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
					{/* 换一批子提示 */}
					<View
						className='flex-start-h box-reset-tip'
						onClick={handleResetClick}
					>
						<View className='iconfont iconhuanyipi'></View>
						<View className='tip-text'>换一批</View>
					</View>
				</Fragment>
			)}
		</PageContent>
	)
}

import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'
import PageContent from '@/components/page-content'
import ButtonBottom from '@/components/button-bottom'
import useDebounce from '@/hooks/useDebounce'
import { deepClone } from '@/utils/index'
import StorageManager from '@/services/StorageManager'
import './index.scss'

const m_managerStorage = StorageManager.getInstance()
export default function BoxOpen() {
	const {
		path,
		params: { selectIndex = '', exclude = '', shaking = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [imgBox, setImgBox] = useState<string>('')
	const [arrBoxList, setBoxList] = useState<Array<any>>([])
	const [objExclude, setExclude] = useState<any>(JSON.parse(exclude))
	const [objShaking, setShaking] = useState<any>(JSON.parse(shaking))

	const memberInfo = useSelector(state => state.memberInfo)

	useEffect(() => {
		Taro.hideShareMenu()
		const blindBoxSelect: any = m_managerStorage.getStorageSync(
			'blind-box-select'
		)
		console.log('BoxOpen useEffect', objExclude, objShaking)
		setImgBox(blindBoxSelect.imgBox)
		setBoxList(blindBoxSelect.boxes)
		setLoadComplete(true)
		Taro.startGyroscope({
			interval: 'normal',
			success: res => {
				console.log('BoxOpen startGyroscope', res)
			},
		})
		Taro.onGyroscopeChange(res => {
			if (Math.abs(res.x) > 5 || Math.abs(res.y) > 5 || Math.abs(res.z) > 5) {
				console.log('BoxOpen onGyroscopeChange', res)
				handleBoxShaking()
			}
		})
		return () => {
			Taro.stopGyroscope()
		}
	}, [])

	// 监听摇盒子情况
	useEffect(() => {
		setBoxList(prevBoxList => {
			const boxListTmp = deepClone(prevBoxList)
			const boxListHead = boxListTmp.filter(item => {
				return objShaking[parseInt(selectIndex)]?.includes(parseInt(item.id))
			})
			const boxListTail = boxListTmp.filter(item => {
				return !objShaking[parseInt(selectIndex)]?.includes(parseInt(item.id))
			})
			return boxListHead.concat(boxListTail)
		})
	}, [objShaking])

	const handleBoxShaking = useDebounce(() => {
		console.log('handleBoxShaking.......')
		if (
			objShaking[parseInt(selectIndex)] &&
			objShaking[parseInt(selectIndex)].length >= 3
		) {
			Taro.showToast({
				title: '很遗憾，无论如何摇也没有什么新的发现了',
				icon: 'none',
				duration: 2000,
			})
			return
		}
		const valueShaking = Math.floor(Math.random() * arrBoxList.length) + 1
		setShaking(prevShaking => {
			const shakingTmp = deepClone(prevShaking)
			if (!shakingTmp[parseInt(selectIndex)]) {
				shakingTmp[parseInt(selectIndex)] = []
			}
			if (shakingTmp[parseInt(selectIndex)].includes(valueShaking)) {
				Taro.showToast({
					title: '好像没有什么新的发现',
					icon: 'none',
					duration: 2000,
				})
			} else {
				shakingTmp[parseInt(selectIndex)].push(valueShaking)
				Taro.showToast({
					title: '似乎能感觉到些什么',
					icon: 'none',
					duration: 2000,
				})
			}
			return shakingTmp
		})
		// 向上个页面发送消息
		Taro.eventCenter.trigger('box-shaking-append', {
			selectIndex,
			value: valueShaking,
		})
	}, 1000)

	const handleButtonClick = e => {
		Taro.showModal({
			title: '提示',
			content: '开启这个盲盒将会使用掉68金币，确定要开启么？',
			success: function (res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			},
		})
		// Taro.eventCenter.trigger('box-exclude-append', {
		// 	selectIndex,
		// 	value: String(Math.floor(Math.random() * 12)),
		// })
	}

	return (
		<PageContent
			customClass='flex-center-v box-open-wrap'
			isShowLeftIcon
			strNavigationTitle={`${parseInt(selectIndex) + 1}号盒子`}
		>
			{isLoadComplete && (
				<Fragment>
					{/* 盒子图案 */}
					<Image className='box-open-img' src={imgBox} mode='aspectFit' />
					{/* 摇盒子提示 */}
					<View className='flex-start-h box-open-tip'>
						<View className='iconfont iconyaoyiyao'></View>
						<View className='tip-text'>摇一摇盲盒</View>
					</View>
					{/* 娃娃展示 */}
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
									{objShaking[parseInt(selectIndex)]?.includes(
										parseInt(item.id)
									) && <View className='box-item-sign'>不是我噢</View>}
								</View>
							))}
					</ScrollView>
					{/* 金币 */}
					<View className='flex-start-h box-open-money'>
						<View className='iconfont iconjinbi'></View>
						<View className='money-text'>{memberInfo.data_money}</View>
					</View>
					{/* 底部按钮 */}
					<ButtonBottom text='就决定是你了' onClick={handleButtonClick} />
				</Fragment>
			)}
		</PageContent>
	)
}

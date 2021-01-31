import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { AtCurtain } from 'taro-ui'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'
import webApi from '@/api'
import PageContent from '@/components/page-content'
import ButtonBottom from '@/components/button-bottom'
import useDebounce from '@/hooks/useDebounce'
import useActions from '@/hooks/useActions'
import memberActions from '@/redux/actions/memberInfo'
import { deepClone } from '@/utils/index'
import StorageManager from '@/services/StorageManager'
import './index.scss'

const m_managerStorage = StorageManager.getInstance()
export default function BoxOpen() {
	const {
		path,
		params: {
			selectIndex = '',
			boxId = '',
			price = '',
			exclude = '',
			shaking = '',
		},
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [imgBox, setImgBox] = useState<string>('')
	const [arrBoxList, setBoxList] = useState<Array<any>>([])
	const [objExclude, setExclude] = useState<any>(JSON.parse(exclude))
	const [objShaking, setShaking] = useState<any>(JSON.parse(shaking))
	const [isShowBaby, setShowBaby] = useState<boolean>(false)
	const [objBabyInfo, setBabyInfo] = useState<any>({})

	const memberInfo = useSelector(state => state.memberInfo)

	const { updateMoney } = useActions(memberActions)

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

	// 摇晃盲盒
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
	}, 600)

	// 开启盲盒
	const handleButtonClick = e => {
		Taro.showModal({
			title: '提示',
			content: `开启这个盲盒将会使用掉${price}金币，确定要开启么？`,
			success: async res => {
				if (res.confirm) {
					console.log('用户点击确定')
					if (memberInfo.data_money >= parseInt(price)) {
						Taro.showLoading()
						const params = {
							arrBoxList,
							boxId,
							price,
							selectIndex,
							objExclude,
							objShaking,
						}
						const res = await webApi.blindBoxInfo.openBlindBox(params)
						console.log('handleButtonClick', res)
						Taro.hideLoading()
						if (res) {
							// 上个页面发消息
							Taro.eventCenter.trigger('box-exclude-append', {
								selectIndex,
								value: String(res.id),
							})
							// 更新redux
							updateMoney(res.money)
							// 本页面相关交互
							setShowBaby(true)
							setBabyInfo(res)
						} else {
							Taro.showToast({
								title: '开启失败',
								icon: 'none',
							})
						}
					} else {
						Taro.showToast({
							title: '金币余额不足',
							icon: 'none',
						})
					}
				}
			},
		})
	}

	// 关闭
	const handleCurtainClose = () => {
		console.log('handleCurtainClose')
		setShowBaby(false)
		Taro.navigateBack()
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
										mode='aspectFit'
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
					{/* 幕帘弹窗 */}
					<AtCurtain
						isOpened={isShowBaby}
						closeBtnPosition='bottom'
						onClose={handleCurtainClose}
					>
						<View className='flex-center-v box-open-baby'>
							<Image
								src={objBabyInfo.url}
								mode='aspectFit'
								className={
									`box-open-baby-image ` +
									`${isShowBaby ? 'box-open-baby-gray ' : ''}` +
									`${isShowBaby ? 'fade-in-from-grayscale ' : ''}`
								}
							/>
							<View className='box-open-baby-name'>{`恭喜你获得【${objBabyInfo.title}】`}</View>
						</View>
					</AtCurtain>
					{/* 底部按钮 */}
					<ButtonBottom text='就决定是你了' onClick={handleButtonClick} />
				</Fragment>
			)}
		</PageContent>
	)
}

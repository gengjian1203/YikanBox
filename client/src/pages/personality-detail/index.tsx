import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { ScrollView, Swiper, SwiperItem, View } from '@tarojs/components'

import webApi from '@/api'
import PageContent from '@/components/page-content'
import PanelShare from '@/components/panel-share'
import { shareType, processSharePath } from '@/utils/index'

import BottomWidget from './components/bottom-widget'
import DetailContent from './components/detail-content'
import SkeletonContent from './components/skeleton-content'

import './index.scss'

export default function PersonalityDetail() {
	const {
		path,
		params: { personalityId = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [arrSwiperList, setSwiperList] = useState<Array<any>>([])
	const [arrIconList, setIconList] = useState<Array<any>>([])
	const [nCurrentDetail, setCurrentDetail] = useState<number>(0)

	const onLoad = async () => {
		const objParams = {
			_id: personalityId,
		}
		const res = await webApi.personalityInfo.queryPersonalityInfo(objParams)
		console.log('queryPersonalityInfo', res?.data)
		const arrSwiperListTmp = res?.data?.arrSwiperList || []
		const arrIconListTmp = res?.data?.arrIconList || []
		setSwiperList(arrSwiperListTmp)
		setIconList(arrIconListTmp)
		setLoadComplete(true)
	}

	useEffect(() => {
		Taro.hideShareMenu()
		onLoad()
	}, [])

	const handleDetailChange = e => {
		setCurrentDetail(e.detail.current)
	}

	const handleIconClick = e => {
		setCurrentDetail(e)
	}

	const handleTestClick = e => {
		console.log('handleTestClick')
		setLoadComplete(prev => {
			return !prev
		})
	}

	const renderDetailContent = () => {
		return (
			<Fragment>
				{isLoadComplete ? (
					<Swiper
						className='detail-swiper-wrap'
						indicatorColor='var(--color-shadow)'
						indicatorActiveColor='var(--color-primary)'
						current={nCurrentDetail}
						circular
						indicatorDots
						onChange={handleDetailChange}
					>
						{arrSwiperList.map((item, index) => (
							<SwiperItem key={index}>
								<ScrollView
									className='flex-center-v detail-swiper-item'
									enableBackToTop
									scrollY
									scrollWithAnimation
								>
									<View className='content-swiper-block'></View>
									<DetailContent content={item.content} />
									<View className='content-swiper-block'></View>
								</ScrollView>
							</SwiperItem>
						))}
					</Swiper>
				) : (
					<Fragment>
						<View className='content-swiper-block'></View>
						<SkeletonContent />
						<View className='content-swiper-block'></View>
					</Fragment>
				)}
			</Fragment>
		)
	}

	return (
		<PageContent
			strNavigationTitle={arrIconList[nCurrentDetail]?.title}
			colorBackgroud='var(--color-primary)'
			colorTitle='var(--color-white)'
			customClass='personality-detail-wrap flex-center-v'
		>
			{true && (
				<Fragment>
					{/* 渲染内容 */}
					{renderDetailContent()}
					{/* 底部小组件面板 */}
					<BottomWidget
						isLoadComplete={isLoadComplete}
						arrIconList={arrIconList}
						nCurrentDetail={nCurrentDetail}
						onIconClick={handleIconClick}
					/>
					{/* 测试按钮 */}
					{/* <View
						style='position: fixed; top: 50%; left: 50%; width: 100px; height: 100px; background-color: red;'
						onClick={handleTestClick}
					>
						Hello
					</View> */}
					{/* 分享面板 */}
					{/* <PanelShare
						isShowPanelShare={false}
						strShareTitle=''
						strShareImage=''
						strSharePath={processSharePath({
							sharePath: path,
							shareType: shareType.PATH_PERSONALITY.name,
							personalityId: personalityId,
						})}
					/> */}
				</Fragment>
			)}
		</PageContent>
	)
}

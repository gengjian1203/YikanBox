import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import { shareType, processSharePath, deepClone } from '@/utils/index'

import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import NavigationHeader from '@/components/NavigationHeader'
import PanelShare from '@/components/PanelShare'
import PanelTips from '@/components/PanelTips'
import ModuleTitle from '@/components/ModuleTitle'

import Config from '@/config/index'

import ItemCard from './components/item-card/index'

import './index.scss'

export default function Popularize() {
	const {} = useRouter()

	const [isShowPanelShare, setShowPanelShare] = useState<boolean>(false) // 是否展示分享面板
	const [arrPopularizeList, setPopularizeList] = useState<Array<any>>([])

	const data_arrShareChildrenList = useSelector(
		state => state.memberInfo.data_arrShareChildrenList
	)

	const strShareUrl = Config.cloudPath + '/common/share.jpg'

	const onLoad = () => {
		const arrListTmp = deepClone(data_arrShareChildrenList)
		setPopularizeList(arrListTmp.reverse())
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [data_arrShareChildrenList])

	// 点击分享
	const handleShareClick = () => {
		setShowPanelShare(true)
	}

	// 跳转到对方成就
	const handleMemberDetailClick = item => {
		// console.log('handleMemberDetailClick', item)
		Taro.navigateTo({
			url: `/pages/mine/achievement/index` + `?memberId=${item._id}`,
		})
	}

	// 分享弹窗反馈
	const handleShowPanelShare = isShow => {
		setShowPanelShare(isShow)
	}

	return (
		<View className='popularize-wrap flex-center-v'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的邀请' />
			{/* 我要邀请 */}
			<AtButton
				type='primary'
				full
				onClick={useThrottle(useCheckLogin(handleShareClick))}
			>
				我要邀请
			</AtButton>
			{/* 邀请数量 */}
			<ModuleTitle
				strTitle={`您一共邀请到了 ${arrPopularizeList.length} 位小伙伴加入`}
			/>
			{/* 列表内容 */}
			{arrPopularizeList && arrPopularizeList.length > 0 ? (
				arrPopularizeList.map((item, index) => {
					return (
						<ItemCard
							key={index}
							_id={item._id}
							avatarUrl={item.avatarUrl}
							gender={item.gender}
							joinTime={item.joinTime}
							nickName={item.nickName}
							shareType={item.shareType}
							sharePath={item.sharePath}
							onClick={useThrottle(
								useCheckLogin(() => handleMemberDetailClick(item))
							)}
						/>
					)
				})
			) : (
				<View className='list-empty flex-center'>
					<PanelTips strType='EMPTY' />
				</View>
			)}

			{/* 分享面板 */}
			<PanelShare
				isShowPanelShare={isShowPanelShare}
				strShareTitle='分享了一个好用的小程序，并@了你'
				strShareImage={strShareUrl}
				strSharePath={processSharePath({
					sharePath: '/pages/main/index',
					shareType: shareType.PATH_POPULARIZE,
				})}
				strContentUrl={strShareUrl}
				onShowPanelShare={handleShowPanelShare}
			/>
		</View>
	)
}

import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { shareType, processSharePath, deepClone } from '@/utils/index'

import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import ModuleTitle from '@/components/ModuleTitle'
import NavigationHeader from '@/components/NavigationHeader'
import TipsPanel from '@/components/TipsPanel'

import ItemCard from './components/item-card/index'
import strShareUrl from '@/images/share.jpg'

import './index.scss'

export default function Popularize() {
	const {} = useRouter()

	const [arrPopularizeList, setPopularizeList] = useState<Array<any>>([])

	const store = useSelector(state => state)
	const data_arrShareChildrenList = useSelector(
		state => state.memberInfo.data_arrShareChildrenList
	)

	const onLoad = () => {
		const arrListTmp = deepClone(data_arrShareChildrenList)
		setPopularizeList(arrListTmp.reverse())
	}

	useShareAppMessage(res => {
		const sharePath = processSharePath(
			{
				sharePath: '/pages/main/index',
				shareType: shareType.PATH_POPULARIZE,
			},
			store
		)
		console.log('useShareAppMessage', sharePath)
		return {
			title: '分享了一个好用的工具箱，并@了你',
			imageUrl: strShareUrl,
			path: sharePath,
		}
	})

	useEffect(() => {
		onLoad()
		return () => {}
	}, [data_arrShareChildrenList])

	const handleMemberDetailClick = item => {
		// console.log('handleMemberDetailClick', item)
		Taro.navigateTo({
			url: `/pages/mine/achievement/index` + `?memberId=${item._id}`,
		})
	}

	return (
		<View className='popularize-wrap flex-center-v'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的邀请' />
			{/* 我要邀请 */}
			<AtButton type='primary' full openType='share'>
				我要邀请
			</AtButton>
			{/* 邀请数量 */}
			{/* <ModuleTitle
				strTitle={`您一共邀请到了 ${arrPopularizeList.length} 位小伙伴加入`}
			/> */}
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
							onClick={() => handleMemberDetailClick(item)}
						/>
					)
				})
			) : (
				<View className='list-empty flex-center'>
					<TipsPanel strType='EMPTY' />
				</View>
			)}
		</View>
	)
}

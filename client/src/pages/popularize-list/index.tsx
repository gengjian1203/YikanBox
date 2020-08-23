import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deepClone } from '@/utils/index'

import { Block, View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import TipsPanel from '@/components/TipsPanel'

import ItemCard from './components/item-card/index'

import './index.scss'

export default function PopularizeList() {
	const {
		params: { strTitle = '' },
	} = useRouter()

	const [arrPopularizeList, setPopularizeList] = useState<Array<any>>([])

	const data_arrShareChildrenList = useSelector(
		state => state.memberInfo.data_arrShareChildrenList
	)

	const onLoad = () => {
		Taro.hideShareMenu()
		const arrListTmp = deepClone(data_arrShareChildrenList)
		setPopularizeList(arrListTmp.reverse())
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [data_arrShareChildrenList])

	const handleMemberDetailClick = item => {
		console.log('handleMemberDetailClick', item)
	}

	return (
		<View className='popularize-list-wrap flex-center-v'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的推广' />
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
							fromType={item.fromType}
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

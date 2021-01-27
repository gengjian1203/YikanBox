import React, { Fragment, useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PageContent from '@/components/page-content'
import useQueryPageList from '@/hooks/useQueryPageList'

import './index.scss'

export default function HallRoom() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [arrBoxList, setBoxList] = useState<Array<any>>([
		{
			img: 'https://res.paquapp.com/boxonline/auto_new/series/5/494.png',
			title: '婚礼花童系列',
			desc: 'MOLLY婚礼花童系列',
		},
		{
			img: 'https://res.paquapp.com/boxonline/auto_new/series/5/494.png',
			title: '婚礼花童系列',
			desc: 'MOLLY婚礼花童系列',
		},
		{
			img: 'https://res.paquapp.com/boxonline/auto_new/series/5/494.png',
			title: '婚礼花童系列',
			desc: 'MOLLY婚礼花童系列',
		},
		{
			img: 'https://res.paquapp.com/boxonline/auto_new/series/5/494.png',
			title: '婚礼花童系列',
			desc: 'MOLLY婚礼花童系列',
		},
	])

	useEffect(() => {
		Taro.hideShareMenu()
		setLoadComplete(true)
	}, [])

	useQueryPageList(
		res => {
			const { state, list } = res
			// setBoxList(list)
		},
		null,
		{}
	)

	const handleBoxClick = item => {
		console.log('handleBoxClick', item)
		Taro.navigateTo({
			url:
				`/pages/blind-box/box-select/index` +
				`?title=${encodeURIComponent(item.title)}`,
		})
	}

	return (
		<PageContent
			customClass='hall-room-wrap'
			isShowLeftIcon
			strNavigationTitle='盲盒大厅'
		>
			{isLoadComplete && (
				<Fragment>
					{arrBoxList &&
						arrBoxList.map((item, index) => (
							<AtButton
								key={index}
								className='box-wrap'
								onClick={() => handleBoxClick(item)}
							>
								<View className='flex-center-v box-item'>
									<Image src={item.img} mode='aspectFill' className='box-img' />
									<View className='flex-start-v box-content'>
										<View className='text-justify box-text box-title'>
											{item.title}
										</View>
										<View className='text-justify box-text box-desc'>
											{item.desc}
										</View>
									</View>
								</View>
							</AtButton>
						))}
				</Fragment>
			)}
		</PageContent>
	)
}

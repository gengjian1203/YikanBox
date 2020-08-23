import React from 'react'
import useThrottle from '@/hooks/useThrottle'
import { normalDate } from '@/utils/index'

import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import './index.scss'

interface IItemCardProps {
	strTitle?: string
	strAuthor?: string
	strCollectTime?: string
	strPosterImg?: string
	strSource?: string
	onClick?: any
}

export default function ItemCard(props: IItemCardProps) {
	const {
		strTitle = '',
		strAuthor = '',
		strCollectTime = '',
		strPosterImg = '',
		strSource = '',
		onClick = (any?: any) => any,
	} = props

	const handleCardClick = e => {
		onClick(e)
	}

	return (
		<View className='item-card-wrap'>
			<AtCard
				note={`作者：${strAuthor}`}
				title={strTitle}
				thumb={strPosterImg}
				onClick={useThrottle(handleCardClick)}
			>
				{`收藏时间：${strCollectTime}`}
			</AtCard>
		</View>
	)
}

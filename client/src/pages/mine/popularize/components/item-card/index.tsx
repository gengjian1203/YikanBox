import React from 'react'
import useThrottle from '@/hooks/useThrottle'
import { getShareTypeName } from '@/utils/index'

import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'

import './index.scss'

interface IItemCardProps {
	_id?: string
	avatarUrl?: string
	gender?: number
	joinTime?: string
	nickName?: string
	shareType?: string
	sharePath?: string
	onClick?: any
}

export default function ItemCard(props: IItemCardProps) {
	const {
		_id = '',
		avatarUrl = '',
		gender = 0,
		joinTime = '',
		nickName = '',
		shareType = '',
		sharePath = '',
		onClick = (any?: any) => any,
	} = props

	const handleCardClick = e => {
		onClick(e)
	}

	return (
		<View className='item-card-wrap'>
			<AtCard
				title={nickName}
				note={`加入方式：${getShareTypeName(shareType)}`}
				thumb={avatarUrl}
				onClick={useThrottle(handleCardClick)}
			>
				{`加入时间：${joinTime}`}
			</AtCard>
		</View>
	)
}

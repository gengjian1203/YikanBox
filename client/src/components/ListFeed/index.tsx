import React from 'react'
import { View, Image } from '@tarojs/components'

import Moments from './Moments'

import './index.scss'

export interface IItemType {
	_id?: string
	author?: string // 作者
	title?: string // 标题
	logo?: string // 头像
	posterImg?: string // 缩略图
	createTime?: string // 创建时间
	address?: string // 地理位置
	source?: string // 源类型
	images?: Array<string> // 缩略图
}

interface IListFeedProps {
	strType:
		| 'MOMENTS' // 朋友圈类型
		| ''
	arrList: Array<IItemType>
	onDetailClick: (any: any) => void
}

export default function ListFeed(props: IListFeedProps) {
	const { strType = '', arrList = [], onDetailClick } = props

	const readerList = () => {
		switch (strType) {
			case 'MOMENTS':
				return <Moments arrList={arrList} onDetailClick={onDetailClick} />
			default:
				return <View></View>
		}
	}

	return readerList()
}

import Taro from '@tarojs/taro'
import React, { useState, useEffect } from 'react'

import { View } from '@tarojs/components'
import PanelTips from '@/components/panel-tips'

import { deepClone } from '@/utils/index'

import ItemCard from '../item-card/index'

import './index.scss'

interface IListArticleProps {
	arrList: Array<any>
}

export default function ListArticle(props: IListArticleProps) {
	const { arrList = [] } = props

	const [arrListArticle, setListArticle] = useState<Array<any>>([])

	useEffect(() => {
		const arrListTmp = deepClone(arrList)
		setListArticle(arrListTmp.reverse())
	}, [arrList])

	const handleArticleDetailClick = item => {
		Taro.navigateTo({
			url: `/pages/article-detail/index` + `?articleId=${item._id}`,
		})
	}

	return (
		<View className='list-article-wrap'>
			{arrListArticle && arrListArticle.length > 0 ? (
				arrListArticle.map((item, index) => {
					return (
						<ItemCard
							key={index}
							strTitle={item.title}
							strAuthor={item.author}
							strCollectTime={item.collectTime}
							strPosterImg={item.posterImg}
							onClick={() => handleArticleDetailClick(item)}
						/>
					)
				})
			) : (
				<View className='list-empty flex-center-v'>
					<PanelTips strType='EMPTY' />
				</View>
			)}
		</View>
	)
}

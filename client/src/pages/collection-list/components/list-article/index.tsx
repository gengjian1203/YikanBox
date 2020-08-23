import Taro from '@tarojs/taro'
import React, { useState, useEffect } from 'react'

import { View } from '@tarojs/components'
import TipsPanel from '@/components/TipsPanel'

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
							strCollectDate={item.collectDate}
							strPosterImg={item.posterImg}
							strSource={item.source}
							onClick={() => handleArticleDetailClick(item)}
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

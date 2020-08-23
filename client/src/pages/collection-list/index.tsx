import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Block } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import NavigationHeader from '@/components/NavigationHeader'
import ListArticle from './components/list-article/index'

import './index.scss'
import { deepClone } from '@/utils/index'

export default function CollectionList() {
	const {} = useRouter()

	const [nTabCurrent, setTabCurrent] = useState<number>(0)
	const [arrListArticle, setListArticle] = useState<Array<any>>([])
	const [arrListPhoto, setListPhoto] = useState<Array<any>>([])
	const [arrListQueue, setListQueue] = useState<Array<any>>([])

	const arrCollectionArticleList = useSelector(
		state => state.memberInfo.data_arrCollectionArticleList
	)
	const arrCollectionPhotoList = useSelector(
		state => state.memberInfo.data_arrCollectionPhotoList
	)
	const arrCollectionQueueList = useSelector(
		state => state.memberInfo.data_arrCollectionQueueList
	)

	const onLoad = () => {
		Taro.hideShareMenu()
		const arrCollectionArticleListTmp = deepClone(arrCollectionArticleList)
		const arrCollectionPhotoListTmp = deepClone(arrCollectionPhotoList)
		const arrCollectionQueueListTmp = deepClone(arrCollectionQueueList)

		setListArticle(arrCollectionArticleListTmp.reverse())
		setListPhoto(arrCollectionPhotoListTmp.reverse())
		setListQueue(arrCollectionQueueListTmp.reverse())
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleTabsClick = e => {
		console.log('handleTabsClick', e)
		setTabCurrent(e)
	}

	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的收藏' />
			{/* 渲染tab */}
			<AtTabs
				scroll={false}
				current={nTabCurrent}
				tabList={[{ title: '文章' }, { title: '图片' }, { title: '接龙' }]}
				onClick={handleTabsClick}
			>
				{/* 文章 */}
				<AtTabsPane current={nTabCurrent} index={0}>
					<ListArticle arrList={arrListArticle} />
				</AtTabsPane>
				{/* 照片 */}
				<AtTabsPane current={nTabCurrent} index={1}>
					<ListArticle arrList={arrListPhoto} />
				</AtTabsPane>
				{/* 接龙 */}
				<AtTabsPane current={nTabCurrent} index={2}>
					<ListArticle arrList={arrListQueue} />
				</AtTabsPane>
			</AtTabs>
		</Block>
	)
}

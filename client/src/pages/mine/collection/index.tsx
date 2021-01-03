import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AtTabs, AtTabsPane } from 'taro-ui'
import PageContent from '@/components/PageContent'

import ListArticle from './components/list-article/index'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

export default function Collection() {
	const {} = useRouter()

	const [nTabCurrent, setTabCurrent] = useState<number>(0)

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
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleTabsClick = e => {
		// console.log('handleTabsClick', e)
		setTabCurrent(e)
	}

	return (
		<PageContent isShowLeftIcon strNavigationTitle='我的收藏'>
			{/* 渲染tab */}
			<AtTabs
				scroll={false}
				current={nTabCurrent}
				tabList={[{ title: '文章' }, { title: '图片' }, { title: '接龙' }]}
				onClick={handleTabsClick}
			>
				{/* 文章 */}
				<AtTabsPane current={nTabCurrent} index={0}>
					<ModuleTitle
						strTitle={`您一共收藏了 ${arrCollectionArticleList.length} 篇文章`}
					/>
					<ListArticle arrList={arrCollectionArticleList} />
				</AtTabsPane>
				{/* 照片 */}
				<AtTabsPane current={nTabCurrent} index={1}>
					<ModuleTitle
						strTitle={`您一共收藏了 ${arrCollectionPhotoList.length} 张图片`}
					/>
					<ListArticle arrList={arrCollectionPhotoList} />
				</AtTabsPane>
				{/* 接龙 */}
				<AtTabsPane current={nTabCurrent} index={2}>
					<ModuleTitle
						strTitle={`您一共收藏了 ${arrCollectionQueueList.length} 个接龙`}
					/>
					<ListArticle arrList={arrCollectionQueueList} />
				</AtTabsPane>
			</AtTabs>
		</PageContent>
	)
}

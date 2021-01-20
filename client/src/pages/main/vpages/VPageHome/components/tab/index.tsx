import React, { useState, useEffect } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import ListFeed from '@/components/list-feed'

import './index.less'

interface ITabParam {
	tabList?: any // tab主列表
	arrList?: any // 帖子列表
	showBottomLoadingTip?: boolean // 是否展示触底加载提示
	onTabChange?: (any?: any) => void // 切换tab
	onDetailClick?: (any?: any) => void // 点击帖子
}

export default function Tab(props: ITabParam) {
	const {
		tabList = [],
		arrList = [],
		showBottomLoadingTip = false,
		onTabChange,
		onDetailClick,
	} = props

	const [tabCurrent, setTabCurrent] = useState<number>(0)

	// 切换tab
	const handleTabChange = current => {
		setTabCurrent(current)
		onTabChange && onTabChange(current)
	}

	// 点击帖子
	const handleDetailClick = item => {
		onDetailClick && onDetailClick(item)
	}

	return (
		<AtTabs
			animated
			current={tabCurrent}
			scroll={tabList.length > 5}
			tabList={tabList}
			onClick={handleTabChange}
		>
			{tabList.map((item, index) => (
				<AtTabsPane current={tabCurrent} index={index} key={index}>
					<ListFeed
						strType={index % 2 === 0 ? 'MOMENTS' : 'BASE'}
						arrList={arrList}
						showBottomLoadingTip={showBottomLoadingTip}
						onDetailClick={handleDetailClick}
					/>
				</AtTabsPane>
			))}
		</AtTabs>
	)
}

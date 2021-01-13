import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { ScrollView, Swiper, SwiperItem, View } from '@tarojs/components'

import PageContent from '@/components/page-content'
import PanelShare from '@/components/panel-share'
import { shareType, processSharePath } from '@/utils/index'

import BottomWidget from './components/bottom-widget'
import DetailContent from './components/detail-content'

import './index.less'

export default function PersonalityDetail() {
	const {
		path,
		params: { personalityId = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [arrSwiperList, setSwiperList] = useState<Array<any>>([])
	const [arrIconList, setIconList] = useState<Array<any>>([])
	const [nCurrentDetail, setCurrentDetail] = useState<number>(0)

	useEffect(() => {
		Taro.hideShareMenu()
		setSwiperList([
			{
				type: 'base',
				content: JSON.stringify([
					{
						type: 'info',
						data: {
							url:
								'https://bkimg.cdn.bcebos.com/pic/42166d224f4a20a4a3ca599795529822730ed08e',
							name: '哆啦A梦',
							job: '22 世纪的猫型机器人',
						},
					},
					{
						type: 'form',
						data: [
							{
								type: 'year',
								icon: 'icongongzuonianxian',
								value: 'bilibili',
							},
							{
								type: 'sex',
								icon: 'iconxingbienanxianxing',
								value: '男',
							},
							{
								type: 'email',
								icon: 'iconyoujian',
								value: '202020020202@qq.com',
							},
							{
								type: 'cellphone',
								icon: 'icondianhua',
								value: '13333333333',
							},
							{
								type: 'github',
								icon: 'icongithub2',
								value: '1111111@github.com',
							},
							{
								type: 'website',
								icon: 'iconwangzhan',
								value: 'https://www.baidu.com',
							},
							{
								type: 'official',
								icon: 'icongongzhonghao',
								value: '茴的第五种写法',
							},
						],
					},
				]),
			},
			{
				type: 'skill',
				content: JSON.stringify([]),
			},
			{
				type: 'experience',
				content: JSON.stringify([
					{
						type: 'timeline',
						data: [
							{
								title: '睡觉',
								content: [
									'23:00',
									'少时诵诗书所所所所所所所所所所所多多',
									'汉皇重色思倾国，御宇多年求不得。 杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。 回眸一笑百媚生，六宫粉黛无颜色。春寒赐浴华清池，温泉水滑洗凝脂。 侍儿扶起娇无力，始是新承恩泽时。云鬓花颜金步摇，芙蓉帐暖度春宵。 春宵苦短日高起，从此君王不早朝。承欢侍宴无闲暇，春从春游夜专夜。 后宫佳丽三千人，三千宠爱在一身。金屋妆成娇侍夜，玉楼宴罢醉和春。 姊妹弟兄皆列土，可怜光彩生门户。遂令天下父母心，不重生男重生女。 骊宫高处入青云，仙乐风飘处处闻。缓歌慢舞凝丝竹，尽日君王看不足。 渔阳鼙鼓动地来，惊破霓裳羽衣曲。九重城阙烟尘生，千乘万骑西南行。 翠华摇摇行复止，西出都门百余里。六军不发无奈何，宛转蛾眉马前死。 花钿委地无人收，翠翘金雀玉搔头。君王掩面救不得，回看血泪相和流。 黄埃散漫风萧索，云栈萦纡登剑阁。峨嵋山下少人行，旌旗无光日色薄。 蜀江水碧蜀山青，圣主朝朝暮暮情。行宫见月伤心色，夜雨闻铃肠断声。 天旋地转回龙驭，到此踌躇不能去。马嵬坡下泥土中，不见玉颜空死处。 君臣相顾尽沾衣，东望都门信马归。归来池苑皆依旧，太液芙蓉未央柳。 芙蓉如面柳如眉，对此如何不泪垂。春风桃李花开夜，秋雨梧桐叶落时。 西宫南苑多秋草，落叶满阶红不扫。梨园弟子白发新，椒房阿监青娥老。 夕殿萤飞思悄然，孤灯挑尽未成眠。迟迟钟鼓初长夜，耿耿星河欲曙天。 鸳鸯瓦冷霜华重，翡翠衾寒谁与共。悠悠生死别经年，魂魄不曾来入梦。 临邛道士鸿都客，能以精诚致魂魄。为感君王辗转思，遂教方士殷勤觅。 排空驭气奔如电，升天入地求之遍。上穷碧落下黄泉，两处茫茫皆不见。 忽闻海上有仙山，山在虚无缥渺间。楼阁玲珑五云起，其中绰约多仙子。 中有一人字太真，雪肤花貌参差是。金阙西厢叩玉扃，转教小玉报双成。 闻道汉家天子使，九华帐里梦魂惊。揽衣推枕起徘徊，珠箔银屏迤逦开。 云鬓半偏新睡觉，花冠不整下堂来。风吹仙袂飘飖举，犹似霓裳羽衣舞。 玉容寂寞泪阑干，梨花一枝春带雨。含情凝睇谢君王，一别音容两渺茫。 昭阳殿里恩爱绝，蓬莱宫中日月长。回头下望人寰处，不见长安见尘雾。 惟将旧物表深情，钿合金钗寄将去。钗留一股合一扇，钗擘黄金合分钿。 但教心似金钿坚，天上人间会相见。临别殷勤重寄词，词中有誓两心知。 七月七日长生殿，夜半无人私语时。在天愿作比翼鸟，在地愿为连理枝。 天长地久有时尽，此恨绵绵无绝期。',
								],
							},
							{
								title: '看电视',
								content: ['20:00 - 23:00'],
							},
							{
								title: '吃饭',
								content: ['19:00 - 20:00'],
							},
							{
								title: '学习',
								content: ['9:00 - 18:00'],
							},
							{
								title: '洗漱',
								content: ['8:30 - 9:00'],
							},
							{
								title: '起床',
								content: ['8:00 - 8:30'],
							},
						],
					},
				]),
			},
			{
				type: 'project',
				content: JSON.stringify([]),
			},
		])
		setIconList([
			{
				title: 'AAAA',
				icon: 'iconbussiness-man',
				color: '#FFD700',
				code: 'AAAA',
			},
			{
				title: 'BBBB',
				icon: 'iconjineng-20',
				color: '#4169E1',
				code: 'BBBB',
			},
			{
				title: 'CCCC',
				icon: 'icongongzuo',
				color: '#00C957',
				code: 'CCCC',
			},
			{
				title: 'DDDD',
				icon: 'iconxiangmu1',
				color: '#8A2BE2',
				code: 'DDDD',
			},
		])
		setLoadComplete(true)
	}, [])

	const handleDetailChange = e => {
		setCurrentDetail(e.detail.current)
	}

	const handleIconClick = e => {
		setCurrentDetail(e)
	}

	const renderDetailContent = () => {
		return (
			<Swiper
				className='detail-content-wrap'
				indicatorColor='var(--color-shadow)'
				indicatorActiveColor='var(--color-primary)'
				current={nCurrentDetail}
				circular
				indicatorDots
				onChange={handleDetailChange}
			>
				{arrSwiperList.map((item, index) => (
					<SwiperItem key={index}>
						<ScrollView
							className='flex-center-v detail-content-item'
							enableBackToTop
							scrollY
							scrollWithAnimation
						>
							<View className='content-item-block'></View>
							<DetailContent content={item.content} />
							<View className='content-item-block'></View>
						</ScrollView>
					</SwiperItem>
				))}
			</Swiper>
		)
	}

	return (
		<PageContent
			strNavigationTitle={arrIconList[nCurrentDetail]?.title}
			colorBackgroud='var(--color-primary)'
			colorTitle='var(--color-white)'
			customClass='personality-detail-wrap flex-center-v'
		>
			{isLoadComplete && (
				<Fragment>
					{/* 渲染内容 */}
					{renderDetailContent()}
					{/* 底部小组件面板 */}
					<BottomWidget
						arrIconList={arrIconList}
						nCurrentDetail={nCurrentDetail}
						onIconClick={handleIconClick}
					/>
					{/* 分享面板 */}
					<PanelShare
						isShowPanelShare={false}
						strShareTitle=''
						strShareImage=''
						strSharePath={processSharePath({
							sharePath: path,
							shareType: shareType.PATH_PERSONALITY.name,
							personalityId: personalityId,
						})}
					/>
				</Fragment>
			)}
		</PageContent>
	)
}

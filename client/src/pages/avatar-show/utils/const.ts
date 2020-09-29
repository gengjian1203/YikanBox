import Config from '@/config/index'

// Draw
const strUrlJewelryZhongqiu00 =
	Config.cloudPath + '/avatar/jewelry/zhongqiu_00.png'
const strUrlJewelryZhongqiu01 =
	Config.cloudPath + '/avatar/jewelry/zhongqiu_01.png'

const strUrlJewelryGuoqing00 =
	Config.cloudPath + '/avatar/jewelry/guoqing_00.png'
const strUrlJewelryGuoqing01 =
	Config.cloudPath + '/avatar/jewelry/guoqing_01.png'
const strUrlJewelryGuoqing02 =
	Config.cloudPath + '/avatar/jewelry/guoqing_02.png'
const strUrlJewelryGuoqing03 =
	Config.cloudPath + '/avatar/jewelry/guoqing_03.png'
const strUrlJewelryGuoqing04 =
	Config.cloudPath + '/avatar/jewelry/guoqing_04.png'

const strUrlJewelryHongdian = Config.cloudPath + '/avatar/jewelry/hongdian.png'
const strUrlJewelryShanchu = Config.cloudPath + '/avatar/jewelry/shanchu.png'
const strUrlJewelryShengdanlaoren =
	Config.cloudPath + '/avatar/jewelry/shengdanlaoren.png'
const strUrlJewelryShengdanmao =
	Config.cloudPath + '/avatar/jewelry/shengdanmao.png'
const strUrlJewelryShengdanshu =
	Config.cloudPath + '/avatar/jewelry/shengdanshu.png'
const strUrlJewelryXueren = Config.cloudPath + '/avatar/jewelry/xueren.png'

// EG

const strUrlJewelryZhongqiu00EG =
	Config.cloudPath + '/avatar/eg/zhongqiu_00.jpg'
const strUrlJewelryZhongqiu01EG =
	Config.cloudPath + '/avatar/eg/zhongqiu_01.jpg'

const strUrlJewelryGuoqing00EG = Config.cloudPath + '/avatar/eg/guoqing_00.jpg'
const strUrlJewelryGuoqing01EG = Config.cloudPath + '/avatar/eg/guoqing_01.jpg'
const strUrlJewelryGuoqing02EG = Config.cloudPath + '/avatar/eg/guoqing_02.jpg'
const strUrlJewelryGuoqing03EG = Config.cloudPath + '/avatar/eg/guoqing_03.jpg'
const strUrlJewelryGuoqing04EG = Config.cloudPath + '/avatar/eg/guoqing_04.jpg'

const strUrlJewelryHongdianEG = Config.cloudPath + '/avatar/eg/hongdian.jpg'
const strUrlJewelryShanchuEG = Config.cloudPath + '/avatar/eg/shanchu.jpg'

export const CANVAS_WIDTH = 350 // 画布宽
export const CANVAS_HEIGHT = 350 // 画布高
export const CANVAS_SAVE_WIDTH = 1080 // 保存图片宽度
export const CANVAS_SAVE_HEIGHT = 1080 // 保存图片高度

export const SIZE_TEXT = 50 // 文字尺寸
export const SIZE_IMAGE = 128 // 图片尺寸

export const BORDER_COLOR = '#ffffff'
export const BORDER_BUTTON_SIZE = 20 // 选中框按钮尺寸
export const BORDER_BUTTON_RADIUS = BORDER_BUTTON_SIZE / 2

// 饰品列表
export const arrJewelryList = [
	{
		title: '中秋',
		list: [
			{
				type: 'IMAGE',
				value: strUrlJewelryZhongqiu00,
				valueEG: strUrlJewelryZhongqiu00EG,
				rect: {
					x: CANVAS_WIDTH - 100,
					y: 0,
					width: 100,
					height: 120,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryZhongqiu01,
				valueEG: strUrlJewelryZhongqiu01EG,
				rect: {
					x: CANVAS_WIDTH - 120,
					y: CANVAS_HEIGHT - 120,
					width: 120,
					height: 120,
				},
			},
		],
	},
	{
		title: '国庆',
		list: [
			{
				type: 'IMAGE',
				value: strUrlJewelryGuoqing00,
				valueEG: strUrlJewelryGuoqing00EG,
				rect: {
					x: 0,
					y: 0,
					width: CANVAS_WIDTH,
					height: Math.floor((CANVAS_WIDTH / 300) * 100),
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryGuoqing01,
				valueEG: strUrlJewelryGuoqing01EG,
				rect: {
					x: 0,
					y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 116),
					width: CANVAS_WIDTH,
					height: Math.floor((CANVAS_WIDTH / 300) * 116),
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryGuoqing02,
				valueEG: strUrlJewelryGuoqing02EG,
				rect: {
					x: 0,
					y: CANVAS_HEIGHT - Math.floor((CANVAS_WIDTH / 300) * 86),
					width: CANVAS_WIDTH,
					height: Math.floor((CANVAS_WIDTH / 300) * 86),
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryGuoqing03,
				valueEG: strUrlJewelryGuoqing03EG,
				rect: {
					x: CANVAS_WIDTH - 120,
					y: CANVAS_HEIGHT - 120,
					width: 120,
					height: 120,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryGuoqing04,
				valueEG: strUrlJewelryGuoqing04EG,
				rect: {
					x: CANVAS_WIDTH - 120,
					y: CANVAS_HEIGHT - 109,
					width: 120,
					height: 109,
				},
			},
		],
	},
	{
		title: '贴纸',
		list: [
			{
				type: 'IMAGE',
				value: strUrlJewelryHongdian,
				valueEG: strUrlJewelryHongdianEG,
				rect: {
					x: CANVAS_WIDTH - 80,
					y: 0,
					width: 80,
					height: 80,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryShanchu,
				valueEG: strUrlJewelryShanchuEG,
				rect: {
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				},
			},
		],
	},
	{
		title: 'emoji',
		list: [
			{
				type: 'TEXT',
				value: '🍀',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '💗',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '💄',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '✨',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🎁',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '💩',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '😙',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '😎',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '😁',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '👿',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
		],
	},
	{
		title: '生肖',
		list: [
			{
				type: 'TEXT',
				value: '🐭',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐂',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐯',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐰',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐉',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐍',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐴',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐑',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐵',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐔',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐩',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
			{
				type: 'TEXT',
				value: '🐷',
				rect: {
					width: SIZE_TEXT,
					height: SIZE_TEXT,
				},
			},
		],
	},
	{
		title: '圣诞',
		list: [
			{
				type: 'IMAGE',
				value: strUrlJewelryShengdanlaoren,
				rect: {
					width: SIZE_IMAGE,
					height: SIZE_IMAGE,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryShengdanmao,
				rect: {
					width: SIZE_IMAGE,
					height: SIZE_IMAGE,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryShengdanshu,
				rect: {
					width: SIZE_IMAGE,
					height: SIZE_IMAGE,
				},
			},
			{
				type: 'IMAGE',
				value: strUrlJewelryXueren,
				rect: {
					width: SIZE_IMAGE,
					height: SIZE_IMAGE,
				},
			},
		],
	},
]

// 底部弹窗列表
export const arrActionSheetList = [
	{
		code: 'toggle-avatar',
		name: '使用自身头像',
	},
	{
		code: 'toggle-camera',
		name: '拍照',
	},
	{
		code: 'toggle-album',
		name: '从手机相册选择',
	},
]

export default {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	arrJewelryList,
	arrActionSheetList,
}

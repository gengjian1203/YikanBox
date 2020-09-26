import Config from '@/config/index'

const strUrlJewelryHongdian = Config.cloudPath + '/avatar/jewelry/hongdian.png'
const strUrlJewelryShanchu = Config.cloudPath + '/avatar/jewelry/shanchu.png'
const strUrlJewelryShengdanlaoren =
	Config.cloudPath + '/avatar/jewelry/shengdanlaoren.png'
const strUrlJewelryShengdanmao =
	Config.cloudPath + '/avatar/jewelry/shengdanmao.png'
const strUrlJewelryShengdanshu =
	Config.cloudPath + '/avatar/jewelry/shengdanshu.png'
const strUrlJewelryXueren = Config.cloudPath + '/avatar/jewelry/xueren.png'

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

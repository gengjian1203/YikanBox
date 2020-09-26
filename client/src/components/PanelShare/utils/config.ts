import Config from '@/config/index'

export const PANEL_SHARE_WIDTH = 300
export const PANEL_SHARE_HEIGHT = 400

interface IBackgroundType {
	strBackgroundUrl: string
	nBackgroundX: number
	nBackgroundY: number
	nBackgroundWidth: number
	nBackgroundHeight: number
}

interface IContentType {
	nContentX: number
	nContentY: number
	nContentWidth: number
	nContentHeight: number
}

interface ISourceType {
	nSourceNameX: number
	nSourceNameY: number
	nSourceNameFontSize: number
	strSourceNameColor: string
	nSourceAvatarX: number
	nSourceAvatarY: number
	nSourceAvatarWidth: number
	nSourceAvatarHeight: number
}

interface IQRCodeType {
	nQRCodeX: number
	nQRCodeY: number
	nQRCodeWidth: number
	nQRCodeHeight: number
}

interface IExtendType {
	nExtendX: number
	nExtendY: number
	nExtendFontSize: number
	strExtendColor: string
	strExtendText: string
}

export interface IConfigType {
	objBackground: IBackgroundType
	objContent: IContentType
	objSource: ISourceType
	objQRCode: IQRCodeType
	objExtend: IExtendType
}

/**
 * 配置文件数值皆为双倍，缩小一倍后再渲染，保证图片质量不虚影
 */
export const CanvasShareConfig: Array<IConfigType> = [
	{
		objBackground: {
			strBackgroundUrl: Config.cloudPath + '/mine/border_01.png',
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 40,
			nContentY: 40,
			nContentWidth: 520,
			nContentHeight: 520,
		},
		objSource: {
			nSourceNameX: 40,
			nSourceNameY: 720,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 40,
			nSourceAvatarY: 600,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 400,
			nQRCodeY: 600,
			nQRCodeWidth: 160,
			nQRCodeHeight: 160,
		},
		objExtend: {
			nExtendX: 40,
			nExtendY: 760,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起过来嗨皮~',
		},
	},
]

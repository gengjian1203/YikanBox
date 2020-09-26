export const PANEL_SHARE_WIDTH = 300
export const PANEL_SHARE_HEIGHT = 400

/**
 * 绘制头像底图
 * @param canvas
 * @param strAvatarImage
 */
const drawAvatarImage = (canvas, strAvatarImage) => {
	if (strAvatarImage) {
		canvas.drawImage(
			strAvatarImage,
			0,
			0,
			PANEL_SHARE_WIDTH,
			PANEL_SHARE_HEIGHT
		)
	} else {
		// console.error('drawMainCanvas strAvatarImage is null.')
	}
}

/**
 * 绘制饰品表
 * @param canvas
 * @param arrAvatarJewelry
 */
const drawAvatarJewelry = (canvas, arrAvatarJewelry) => {
	// 绘制
	for (let item of arrAvatarJewelry) {
		const rectJewelryBase = {
			x: item.rect.x,
			y: item.rect.y,
			width: item.rect.width,
			height: item.rect.height,
		}
		switch (item.type) {
			case 'TEXT':
				const size =
					rectJewelryBase.width < rectJewelryBase.height
						? rectJewelryBase.width
						: rectJewelryBase.height
				canvas.setFontSize(size)
				canvas.fillText(item.value, rectJewelryBase.x, rectJewelryBase.y + size)
				break
			case 'IMAGE':
				canvas.drawImage(
					item.value,
					rectJewelryBase.x,
					rectJewelryBase.y,
					rectJewelryBase.width,
					rectJewelryBase.height
				)
				break
			default:
				break
		}
	}
}

/**
 * 绘制canvas分享图主函数
 * @param canvas
 * @param avatarShowInfo
 */
export const drawCanvasShare = (canvas, avatarShowInfo) => {
	console.log('drawCanvasShare.')
	const { strAvatarImage, arrAvatarJewelry } = avatarShowInfo

	if (canvas) {
		// 绘制头像底图
		drawAvatarImage(canvas, strAvatarImage)
		// 绘制饰品表
		drawAvatarJewelry(canvas, arrAvatarJewelry)
	} else {
		console.error('drawCanvasShare canvas is null.')
	}
}

export default {
	PANEL_SHARE_WIDTH,
	PANEL_SHARE_HEIGHT,
	drawCanvasShare,
}

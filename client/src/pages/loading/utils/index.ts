import { deepClone } from '@/utils/index'

export const changeQRCodeParam = objParam => {
	const objResult = deepClone(objParam)
	for (let key in objResult) {
		if (key === 'shareType') {
			objResult[key] = objResult[key].replace('PATH', 'QRCODE')
		}
	}

	return objResult
}

export default {
	changeQRCodeParam,
}

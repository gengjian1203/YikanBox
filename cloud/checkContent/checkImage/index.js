/**
 * checkImage
 * 校验图片的敏感信息
 * @param {*} data
 * @param {*} cloud
 * @returns
 */

async function checkImage(data, cloud) {
	let objResult = {}

	try {
		const res = await cloud.openapi.security.imgSecCheck({
			media: {
				header: { 'Content-Type': 'application/octet-stream' },
				contentType: 'image/png',
				value: Buffer.from(data.value),
			},
		})
		console.log('checkImage', res)
		objResult = {
			code: 200,
			data: res,
		}
	} catch (err) {
		console.error('checkImage', err)
	}

	return objResult
}

module.exports = checkImage

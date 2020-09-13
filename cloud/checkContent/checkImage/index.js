/**
 * checkImage
 * 校验图片的敏感信息
 * @param {*} data
 * @param {*} cloud
 * @returns
 */

async function checkImage(data, cloud) {
	let objResult = {}
	let buffer = ''
	try {
		const res = await cloud.downloadFile({
			fileID: data.value,
		})
		buffer = res.fileContent
		// 异步删除验证用图片
		cloud.deleteFile({
			fileList: [data.value],
		})
	} catch (err) {
		console.error('readFileSync Error.', err)
	}

	// console.log('downloadFile3', JSON.stringify(buffer))

	if (buffer) {
		try {
			const res = await cloud.openapi.security.imgSecCheck({
				media: {
					// header: { 'Content-Type': 'application/octet-stream' },
					contentType: 'image/png',
					value: buffer,
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
	}

	return objResult
}

module.exports = checkImage

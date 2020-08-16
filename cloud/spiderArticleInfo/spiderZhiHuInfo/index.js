/**
 * spiderZhiHuInfo
 * 爬取知乎日报文章
 * @param {*} data
 * @param {*} db
 * @returns
 */
const strServceUrl = 'https://daily.zhihu.com'

const queryZhiHuInfoDetail = async (href, superagent, cheerio, entities) => {
	console.log('queryZhiHuInfoDetail', `${strServceUrl}${href}`)
	const objDetail = {}
	const result = await superagent.get(`${strServceUrl}${href}`).charset('utf-8') //取决于网页的编码方式
	const data = result.text || ''
	const $ = cheerio.load(result.text)
	console.log('queryZhiHuInfoDetail', data)
	console.log('queryZhiHuInfoDetail', $)

	objDetail.author = $('.author').text() // 作者信息
	objDetail.content = entities.decode($('.content').html()) // 文章内容

	return objDetail
}

async function spiderZhiHuInfo(db, superagent, cheerio, entities) {
	const arrResultList = []
	const result = await superagent.get(strServceUrl).charset('utf-8') //取决于网页的编码方式
	const data = result.text || ''
	const $ = cheerio.load(result.text)
	console.log('spiderZhiHuInfo', data)
	console.log('spiderZhiHuInfo', $)

	const list = $('.main-content-wrap .row').find('.link-button')
	for (let index in list) {
		const objInfo = {
			createDate: db.serverDate(), // 创建时间
		}
		const objHtml = list.eq(index)
		objInfo.href = objHtml.attr('href')
		console.log('spiderZhiHuInfo1', objInfo.href)
		if (objInfo.href) {
			objInfo.id = parseInt(objInfo.href.substring(7)) // 文章ID
			objInfo.img = objHtml.find('img').attr('src') // 文章截图
			objInfo.title = objHtml.find('.title').text() // 文章标题

			const { author, content } = await queryZhiHuInfoDetail(
				objInfo.href,
				superagent,
				cheerio,
				entities
			)
			objInfo.author = author
			objInfo.content = content

			arrResultList.push(objInfo)
		}
	}

	console.log('spiderZhiHuInfo', arrResultList)

	return arrResultList
}

module.exports = spiderZhiHuInfo

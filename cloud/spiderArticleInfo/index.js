// 云函数入口文件
const cloud = require('wx-server-sdk')
const cheerio = require('cheerio') //进入cheerio模块
const charset = require('superagent-charset') //解决乱码问题:
const Entities = require('html-entities').XmlEntities
const entities = new Entities() // 解析html
const superagent = require('superagent') //发起请求
charset(superagent)

const spiderZhiHuInfo = require('spiderZhiHuInfo/index.js')

// 与小程序端一致，均需调用 init 方法初始化
cloud.init({
	// API 调用都保持和云函数当前所在环境一致
	env: cloud.DYNAMIC_CURRENT_ENV,
})

// 可在入口函数外缓存 db 对象
const db = cloud.database()

// 校验返回值
const validResult = objTmp => {
	if (objTmp.code) {
		objTmp.code = 500
	}
	return objTmp
}

/**
 * 信息存入数据库
 */
const pushArticleInfoList = async arrData => {
	const arrResult = []

	try {
		for (let item of arrData) {
			let objArticleInfo = null
			// 查询是否有相同的文章
			try {
				objArticleInfo = await db
					.collection('articleInfo')
					.where({
						href: item.href,
					})
					.get()
			} catch (e) {
				console.error('queryArticleInfo error', e)
			}

			if (objArticleInfo.data.length === 0) {
				const res = await db.collection('articleInfo').add({ data: item })
				arrResult.push(item)
			}
		}
	} catch (e) {
		console.error('pushArticleInfoList error.', e, arrData)
	}

	return arrResult
}

/**
 * 定时爬取文章
 * @param {*} event
 * @param {*} context
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const strType = 'ZHIHU' // 'ZHIHU'-知乎日报
	let objResult = {}
	let arrData = []
	let arrDataResult = []

	try {
		switch (strType) {
			case 'ZHIHU':
				arrData = await spiderZhiHuInfo(db, superagent, cheerio, entities)
				break
			default:
				break
		}
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('爬取网上信息error.', e)
	}

	try {
		arrDataResult = await pushArticleInfoList(arrData)
	} catch (e) {
		objResult = {
			code: 500,
			data: e,
		}
		console.error('信息存入数据库error.', e)
	}

	objResult.data = arrDataResult

	return validResult(objResult)
}

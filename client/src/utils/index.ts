import getArticleTagName from './article/getArticleTagName'
import checkObjectEmpty from './base/checkObjectEmpty'
import deepClone from './base/deepClone'
import deepCompare from './base/deepCompare'
import getHDAvatarUrl from './base/getHDAvatarUrl'
import mergeObject from './base/mergeObject'
import UUID from './base/UUID'
import ellipsisString from './format/ellipsisString'
import hiddenString from './format/hiddenString'
import normalDate from './format/normalDate'
import router2param from './format/router2param'
import router2url from './format/router2url'
import simpleDate from './format/simpleDate'
import getShareTypeName from './share/getShareTypeName'
import { shareType, processSharePath } from './share/processSharePath'
import uploadImage from './upload/uploadImage'

export {
	shareType,
	getArticleTagName,
	checkObjectEmpty,
	deepClone,
	deepCompare,
	getHDAvatarUrl,
	mergeObject,
	UUID,
	ellipsisString,
	hiddenString,
	normalDate,
	router2param,
	router2url,
	simpleDate,
	getShareTypeName,
	processSharePath,
	uploadImage,
}

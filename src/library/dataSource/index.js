import Vue from 'vue'
import Resource from 'vue-resource'
import _ from '../uitl/underscore-min'

Vue.use(Resource);
let test = '';
let build = '';
let urlList = {};
let cacheObject = {};
let beforeList = [];
let afterList = [];
function beforeListStart(){
	runFnList(beforeList);
}
function afterListStart(data){
	runFnList(afterList, data);
}
function runFnList(list, data){
	for(let i = 0; i < list.length; i++){
		list[i](data);
	}
}
function getByCache({
	key,
	params
}) {
	if (!cacheObject[key]) {
		return false;
	}
	let cacheData = cacheObject[key];
	for (let i = 0; i < cacheData.length; i++) {
		let cacheOne = cacheData[i];
		if (_.isEqual(params, cacheOne.params)) {
			cacheOne.cacheCount--;
			if (cacheOne.cacheCount === 0) {
				cacheData.splice(i, 1);
			}
			return cacheOne.data;
		}
	}
	return false;
}

function setByCache(key, params, data) {
	cacheObject[key] = cacheObject[key] || []
	let cacheData = cacheObject[key];
	let option = urlList[key];
	if (option.cacheCount * option.cacheMore === 0) {
		return;
	}
	//查找当前params
	let cacheLength = cacheData.length;
	for (let i = 0; i < cacheLength; i++) {
		let cacheOne = cacheData[i];
		if (_.isEqual(params, cacheOne.params)) {
			cacheOne.data = data;
			cacheOne.cacheCount = option.cacheCount;
			return;
		}
	}
	if (cacheLength >= option.cacheMore) {
		cacheData.shift();
	}
	cacheData.push({
		'params': params,
		'data': data,
		'cacheCount': option.cacheCount
	});
}

function getData({
	key,
	params,
	fn,
	fn2,
	byCache
}) {
	beforeListStart();
	if (byCache) {
		let cacheData = getByCache({
			key,
			params
		});
		if (cacheData) {
			afterListStart();
			fn && fn(cacheData);
			return;
		}
		let value = urlList[key];
		if (!value) {
			throw 'dataSource ' + key + ' not find';
			return;
		}
		let isTest = value.isTest;
		let url = value.allUrl ? value.allUrl : (isTest ? test : build) + value.url;
		Vue.http[value.type](url, params, {
			xhr : {withCredentials: !isTest}
		}).then(function(response) {
			if(response.data.code == '200'){
				setByCache(key, params, response.data);
				fn && fn(response.data);
			}else{
				fn2 && fn2(response.data);
			}
			afterListStart(response.data);
		}, function(response) {
			fn2 && fn2(response.data);
			afterListStart(response.data);
		});
	}
}
let getDataSource = function getDataSource(key, params, fn, fn2){
	if(typeof params === 'function'){
		fn2 = fn;
		fn = params;
		params = {};
	}
	var option = {key, params, fn, fn2};
	option.byCache = true;
	getData(option);
}
getDataSource.getNew = function(key, params, fn, fn2){
	if(typeof params === 'function'){
		fn2 = fn;
		fn = params;
		params = {};
	}
	var option = {key, params, fn, fn2};
	option.byCache = false;
	getData(option);
}
getDataSource.init = function(urlL, buildUrl, testUrl){
	let all = {
		isTest: false,
		cacheCount: 0,
		cacheMore: 1,
		type: 'post'
	};
	for (let key in urlL) {
		for(let oKey in all){
			urlL[key][oKey] ? '' : urlL[key][oKey] = all[oKey];
		}
		urlList[key] = urlL[key];
	}
	build = buildUrl;
	test = testUrl;
}
getDataSource.before = function(fn){
	fn && beforeList.push(fn);
}
getDataSource.after = function(fn){
	fn && afterList.push(fn);
}
/**
 *  data,fn,fn2 可选
 */
export default getDataSource
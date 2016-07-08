import _ from '../uitl/underscore-min'
let o = {
	error() {},
	success() {},
	dataSource() {},
	params: {},
	pageNo: 1,
	pageSize: 10,
	urlKey: '',
	dataFrom: null
};
let Page = function(option) {
	this._isFind = false;
	this.dataList = [];
	this.data = {};
	this.hasNext = true;
	this.option = _.extend({}, o, option);
	this.init();
}
Page.prototype.init = function() {
	getData(this);
}
Page.prototype.next = function() {
	if (this.hasNext) {
		getData(this, this.option.pageNo + 1);
	}
}
Page.prototype.success = function(data, pageNo) {
	if (pageNo !== this.option.pageNo) {
		this.option.pageNo = pageNo;
	}
	this.option.success(data, pageNo, this.option.params.pageSize);
}
Page.prototype.error = function(data, pageNo) {
	this.option.error(data, pageNo, this.option.params.pageSize);
}

function getData(page, pageNo) {
	if (page._isFind) {
		return;
	}
	page._isFind = true;
	page.option.params.pageNo = pageNo || page.option.pageNo;
	page.option.params.pageSize = page.option.pageSize;
	page.option.dataSource(page.option.urlKey, page.option.params, function(data) {
		if (data.data.length < page.option.pageSize) {
			page.hasNext = false;
		}
		page.dataList = page.dataList.concat(page.option.dataFrom ? data.data[page.option.dataFrom] : data.data);
		page.data = data.data;
		page.success(data, page.option.params.pageNo);
		page._isFind = false;
	}, function(data) {
		page.error(data, page.option.params.pageNo);
		page._isFind = false;
	});
}

export default function(option) {
	let page = new Page(option);
	return page;
}
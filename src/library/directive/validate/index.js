import Vue from 'vue'
import _ from '../../uitl/underscore-min'

let allValidate = {};
let validateMap = {
	notNull: function(val) {
		return !_.isEmpty(val)
	},
	isCheck: function(val){
		return val;
	},
	phone: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i,
	eMail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+$/
	
};

function validate(vmKey, key) {
	if (key) {
		return checkData(allValidate[vmKey][key]);
	}
	for (let one in allValidate[vmKey]) {
		if (!checkData(allValidate[vmKey][one])) {
			return false;
		}
	}
	return true;
}

function popup(option) {
	console.log(option.prompt);
}

function checkData(option, data) {
	data = data || option.data;
	if (option.validate) {
		for (let i = 0; i < option.validate.length; i++) {
			if(!checkData(option.validate[i], data)){
				return false;
			}
		}
	} else {
		if (_.isArray(option.vali)) {
			for (let i = 0; i < option.vali.length; i++) {
				if (!checkOne(data, option.vali[i])) {
					popup(option);
					return false;
				}
			}
		} else {
			if (!checkOne(data, option.vali)) {
				popup(option);
				return false;
			}
		}
	}
	return true;
}

function checkOne(data, reg) {
	if (_.isRegExp(reg)) {
		return reg.test(data);
	}
	if (_.isString(reg)) {
		return checkOne(data, validateMap[reg]);
	}
	if (_.isFunction(reg)) {
		return reg(data);
	}
	return true;
}

/**			newValue : {} or {[]}
 * 	{} ->	
 * 			data : 校验的字段
 * 			vali : '' or `regexp` or `function` or ['', regexp, function]
 * 			prompt : ''  校验的错误提示
 * 
 * 	{[]} ->
 * 			data : 校验的字段
 * 		[] ->
 * 			validate : [{
 * 				vali : '' or `regexp` or `function` or ['', regexp, function]
 * 				prompt : ''  校验的错误提示
 * 			}]
 */
Vue.directive('validate', {
	bind: function() {
		if (!this._validate) {
			this._validate = _.now();
		}
		if (!this.vm._validate) {
			this.vm._validate = _.now();
		}
		allValidate[this.vm._validate] = allValidate[this.vm._validate] || {};
		allValidate[this.vm._validate][this._validate] = allValidate[this.vm._validate][this._validate] || {};
		this.el.onblur = function(event) {
			validate(this.vm._validate, this._validate);
		}.bind(this);
	},
	update: function(value) {
		allValidate[this.vm._validate][this._validate] = value;
	},
	unbind: function() {
		delete allValidate[this.vm._validate][this._validate];
	}
})
let validateSub = function(vm){
	return validate(vm._validate);
}
validateSub.popup = function(fn){
	popup = fn || popup;
}
validateSub.add = function(key, value){
	if(_.isString(key)){
		validateMap[key] = value;
	}
	if(_.isObject(key)){
		validateMap = _.extend(validateMap, key);
	}
}
validateSub.check = checkOne;
export default validateSub;

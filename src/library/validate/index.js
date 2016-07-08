import _ from '../uitl/underscore-min'

/**
 * data			:	校验数据
 * vm 			:	绑定vue实例
 * validate		:	校验规则列表->{} or [{}]
 * validate ->		从上到下依次校验
 * 		{
 * 			keys : '' or ['']  对于data的一个或者多个对象
 * 			vali : '' or `regular` or `function` or ['', regular, function]
 * 			prompt : '' or [{key : ''}]   校验的错误提示,可以写对象数组,根据配置的keys来找当前的key来分别提示
 * 		}
 */
let o = {
	data: {},
	vm: {},
	validate: []
}

function validate(option) {
	option = _.extend(o, option);
	let vm = option.vm;
	let data = option.data;
	let validate = option.validate;
	if(_.isEmpty(data) || _.isEmpty(vm)){
		return false;
	}
	if(_.isEmpty(validate)){
		return true;
	}
	let v = getValiMap(validate);
	
	
}

export default validate
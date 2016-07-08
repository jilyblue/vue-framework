import Vue from 'vue'
import cityInit from '../uitl/cityInit'


Vue.filter('city', {
	read: function(val, key) {
		this.value = val;
		return cityInit.getShowValue(val);
	},
	write: function(val, oldVal) {
		let reVal;
		if(/[0-9]/ig.test(val)){
			reVal = val;
			this.value = val;
		}else{
			reVal = this.value;
		}
		return reVal;
	}
});
import Vue from 'vue'
import dateformat from 'dateformat'
import toDate from '../uitl/strToDate'


Vue.filter('yyyymmdd', {
	read: function(val, key) {
		return val ? dateformat(toDate(val), key) : '';
	},
	write: function(val, oldVal) {
		return val.replace(/[^0-9]/ig, '');
	}
});
Vue.filter('date', function(val, key) {
	return dateformat(val, key);
});
import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource);

export default {
	getData: function(fn) {
		Vue.http.post('http://120.26.221.15/mockjsdata/3/getCoupon').then(function(response) {
			fn(response.data);
			console.log(response.data)
		}, function(response) {
			console.log(response.data);
		});
	}
}
import Vue from 'vue'
import mobiscroll from './js/mobiscroll.custom-3.0.0-beta.min'

require('./css/mobiscroll.custom-3.0.0-beta.min.css');

Vue.directive('date-scroll', {
	bind: function() {
	},
	update: function(newValue, oldValue) {
		let instance = mobiscroll.date(this.el, newValue);
	},
	unbind: function() {
	}
})
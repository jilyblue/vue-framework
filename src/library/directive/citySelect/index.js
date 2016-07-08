import Vue from 'vue'
import cityInit from '../../uitl/cityInit'
import mobiscroll from '../mobiscroll/js/mobiscroll.custom-3.0.0-beta.min'

require('../mobiscroll/css/mobiscroll.custom-3.0.0-beta.min.css');

Vue.directive('city-scroll', {
	bind: function() {},
	update: function(newValue, oldValue) {
		var wheel = [
			[{
				circular: false,
				data: cityInit.getProvincesList(),
			}, {
				circular: false,
				data: []
			}]
		];
		let nextVal = -1;
		mobiscroll.scroller(this.el, {
			theme: 'mobiscroll',
			display: 'bottom',
			lang: 'zh',
			wheels: wheel,
			validate: function(event, inst) {
				var column2;
				column2 = cityInit.getCityList([event.values[0]]);
				wheel[0][1].data = column2;
				if(nextVal !== event.values[0]){
					inst._tempWheelArray[1] = column2[0].value;
				}
				nextVal = event.values[0];
				inst.settings.wheels = wheel;
				inst.changeWheel({
					1: wheel[0][1]
				});
			},
			formatValue: function(data, inst) {
				return data[1];
			}
		});
	},
	unbind: function() {}
})
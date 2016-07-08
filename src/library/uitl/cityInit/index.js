import provinces from './provinces.json'
import cities from './cities.json'

let provincesMap = {};
let cityMap = {};
let cityAllMap = {};
for (let i = 0; i < provinces.length; i++) {
	let one = provinces[i];
	one.display = one.provinceName;
	one.value = one.id;
	provincesMap[one.id] = one;
}
for (let i = 0; i < cities.length; i++) {
	let one = cities[i];
	one.display = one.name;
	one.value = one.id;
	cityAllMap[one.id] = one;
	cityMap[one.provinceId] = cityMap[one.provinceId] || [];
	cityMap[one.provinceId].push(one);
}
export default {
	getProvincesList: function() {
		return provinces;
	},
	getCityList: function(key) {
		return cityMap[key];
	},
	getShowValue: function(key) {
		if (!cityAllMap[key]) {
			return '';
		}
		return provincesMap[cityAllMap[key].provinceId].display + ' ' + cityAllMap[key].display
	}
}
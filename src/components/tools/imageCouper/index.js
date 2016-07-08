import Vue from 'vue'
import Couper from './Couper.vue'

let CouperConstructor = Vue.extend(Couper);

let couperVM, reFn;
let input = document.createElement('input');
input.type = 'file';
input.addEventListener('change', event => {
	couperVM = new CouperConstructor({
		el: document.createElement('div'),
		data(){
			return {
				file : event.target.files[0],
				reFn : reFn
			}
		}
	});
	input.value = '';
	couperVM.$appendTo(document.body);
});

let showCouper = (fn) => {
	let evt = document.createEvent('HTMLEvents');
	evt.initEvent('click', true, true);
	input.dispatchEvent(evt);
	reFn = fn;
}

export default showCouper
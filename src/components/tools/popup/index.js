require('./vue-msgbox.css');
import Vue from 'vue'
import MessageBox from 'vue-msgbox'
import Load from './Loading.vue'
import Prom from './Prompt.vue'
import ShareBox from './Share.vue'

let LoadingConstructor = Vue.extend(Load);
let PromptConstructor = Vue.extend(Prom);
let ShareConstructor = Vue.extend(ShareBox);

let loadvm, promptvm, sharevm;
/*
 * Prompt操作
 */
function initPrompt(vm) {
	promptvm = new vm({
		el: document.createElement('div')
	});
	promptvm.$appendTo(document.body);
}
function showPrompt(msg) {
	!promptvm && initPrompt(PromptConstructor);
	promptvm.isShow = true;
	promptvm.message = msg;
}
let Prompt = showPrompt;
Prompt.show = showPrompt;

/*
 * loading操作
 */
function initLoading(vm) {
	loadvm = new vm({
		el: document.createElement('div')
	});
	loadvm.$appendTo(document.body);
}
function showLoading(msg) {
	!loadvm && initLoading(LoadingConstructor);
	loadvm.visible = true;
	loadvm.message = msg;
}
let Loading = showLoading;
Loading.show = showLoading;
Loading.hide = function(LoadingConstructor) {
	loadvm.visible = false;
}

/*
 * Share操作
 */
function initShare(vm) {
	sharevm = new vm({
		el: document.createElement('div')
	});
	sharevm.$appendTo(document.body);
}
function showShare() {
	!sharevm && initShare(ShareConstructor);
	sharevm.visible = true;
}
let Share = showShare;


export {
	MessageBox,
	Loading,
	Prompt,
	Share
}
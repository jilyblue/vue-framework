import Vue from 'vue'

Vue.filter('language',function(val){
	return val=='en' ? '英文' : '中文';
});

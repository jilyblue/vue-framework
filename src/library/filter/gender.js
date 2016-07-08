import Vue from 'vue'

Vue.filter('gender', function(val){
	return val ==1 ? '男':'女';  
});

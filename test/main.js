import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router);
var router = new Router();

router.map({ 
		'/image': {
			component: function(resolve) {
				require(['./Image.vue'], resolve);
			}
		}
	})
router.redirect({ 
	'*': '/image'
})

router.start(App, 'app')
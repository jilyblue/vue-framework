<template>
	<div v-if="rendered" v-show="visible" class="popupLoading">
		 <i class="fa fa-spinner fa-pulse"></i>
		 <p>{{message}}</p>
	</div>
</template>
<style lang="scss" scoped>
	.popupLoading {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: #fff;
		i{
			font-size: 30px;
		}
		p{
			margin-top: 20px;
		}
	}
</style>
<script>
	import Popup from 'vue-popup';
	require('vue-popup/lib/popup.css');
	export default {
		mixins: [Popup],
		props: {
			modal: {
				default: true
			},
			closeOnClickModal: {
				default: false
			}
		}
	};
</script>
<template>
	<div v-if="rendered" v-show="visible" class="popupShare" @click="removeShare">
		 <img src="../../../assets/share.png"/>
	</div>
</template>
<style lang="scss" scoped>
	.popupShare {
		position: fixed;
		top: 0;
		right: 0;
		img{
			width: 250px;
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
				default: true
			}
		},
		methods: {
			removeShare: function(){
				this.visible = false;
			}
		}
	};
</script>
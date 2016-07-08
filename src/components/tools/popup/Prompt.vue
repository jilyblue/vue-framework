<template>
	<div class="prompt" :class="show ? 'promptShow' : 'promptHide'">
		<p v-show="message">{{message}}</p>
	</div>
</template>
<style lang="scss" scoped>
	.prompt {
		position: fixed;
		z-index: 900;
		bottom: 100px;
		text-align: center;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 12px;
		p {
			display: inline-block;
			margin: auto;
			background: rgba(0, 0, 0, 0.7);
			color: #fff;
			padding: 10px 20px;
			border-radius: 20px;
			position: relative;
		}
	}
</style>
<style lang="scss">
	@keyframes promptShow {
		from {
			bottom: 120px;
			opacity: 0;
			display: block;
		}
		to {
			opacity: 1;
			bottom: 100px;
		}
	}
	
	@keyframes promptHide {
		from {
			opacity: 1;
			bottom: 100px;
		}
		to {
			bottom: 80px;
			opacity: 0;
			display: none;
		}
	}
	
	.promptShow {
		animation: promptShow 0.2s linear 0s 1 forwards;
	}
	
	.promptHide {
		animation: promptHide 0.2s linear 0s 1 forwards;
	}
</style>
<script>
	export default {
		data: function() {
			return {
				message: '',
				show: false,
				time: 2000,
				timer: null
			}
		},
		computed: {
			isShow: {
				set: function(value) {
					this.show = value;
					clearTimeout(this.timer);
					this.timer = setTimeout(function() {
						this.show = false;
					}.bind(this), this.time);

				},
				get: function(value) {}
			}
		}
	};
</script>
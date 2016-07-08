<template>
	<div class="body">
		<span class="title">{{options.title}}</span>
		<span class="explain">{{options.explain}}</span>
	</div>
</template>

<script>
	//
	export default {
		props: ['options'],
		data: function() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../style/index";
	.body {
		.title {
			font-size: 50px;
			line-height: 50px;
			padding: 0 20px;
			color: $color;
		}
		.explain {
			color: #333;
		}
	}
</style>
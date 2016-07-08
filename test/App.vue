<template>
	<!--<top-lock :options="menuOption">-->
		<!--<top slot="top" :options="topOption"></top>
		<div slot="content">-->
			<router-view keep-alive transition transition-mode="out-in">
			</router-view>
		<!--</div>-->
	<!--</top-lock>-->

	<!-- use router-view element as route outlet -->
</template>

	export default {
		components: {
		},
		data: function() {
			
		}
	}
</script>

<style lang="scss">
	$fa-font-path : "../src/style/fonts";
	@import "../src/style/scss/font-awesome";
	@import "../src/style/common.css";
</style>
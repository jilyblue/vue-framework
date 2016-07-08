<template>
	<div class="hello">
		<h1>{{ msg }}zujian1</h1>
		<slot name="name"></slot>
	</div>
</template>

<script>
	export default {
		props: ['msg', 'comps'],
		data: function(){
			return {
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1 {
		color: #42b983;
	}
</style>
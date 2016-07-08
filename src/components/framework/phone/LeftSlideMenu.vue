<!--
	options:
	{
		title: '标题',
		letfBtn: {
			icon : '',
			click : fn 
		}
		menus: [
			{
				title: '菜单名',
				url: '路由地址'
			}
		]
	}
-->
<template>
	<div class="panel" v-bind:class="menuClass">
		<div class="leftPanel">
			<div class="logo"></div>
			<ul class="menuList">
				<li v-for="menu in options.menus" v-on:click="liClick(menu.url)">{{$t ? $t(menu.title) : menu.title}}</li>
			</ul>
		</div>
		<div class="commonPanel">
			<div class="mask" v-show="menuClass.leftSlideMenuShow" v-on:click="liClick()"></div>
			<div class="commonTop">
				<div v-if="!options.letfBtn || !options.letfBtn.icon" class="commonMenuBtn" v-on:click="showMenu()">
					<i class="fa fa-list"></i> 
				</div>
				<div v-else class="commonMenuBtn" v-on:click="options.letfBtn.click()">
					<i class="{{options.letfBtn.icon}}"></i>
				</div>
				<div class="commonTitle">
					{{$t ? $t(options.title) : options.title}}
				</div>
			</div>
			<div class="contentPanel">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['options'],
		data: function() {
			return {
				menuClass: {
					'leftSlideMenuHide': false,
					'leftSlideMenuShow': false
				}
			}
		},
		computed: {
			menuShow: {
				get: function() {
					return this.menuClass.show;
				},
				set: function(isShow) {
					this.menuClass.leftSlideMenuHide = !isShow;
					this.menuClass.leftSlideMenuShow = isShow;
				}
			}
		},
		methods: {
			showMenu: function() {
				this.menuShow = true;
			},
			liClick: function(url = '') {
				if (url) {
					this.$route.router.go(url);
				}
				this.menuShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color: #006600 !default;
	$topColor: #2cb300 !default;
	$titleHight: 60px !default;
	$menuWidth: 160px !default;
	$menuFontSize: 16px !default;
	$titleFontSize: 14px !default;
	$logoHeight: 100px !default;
	$logoWidth: 100px !default;
	$logo: url(../../../assets/logo.png) !default;
	$menuEnlarger: 1em !default;
	
	.logo {
		background: $logo no-repeat center;
		background-size: 100%;
	}
	
	.panel {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.commonPanel {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 1000;
		}
	}
	.contentPanel{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow-y: auto;
		z-index: 0;
	}
	.leftPanel {
		width: $menuWidth;
		position: absolute;
		top: 0;
		left: -$menuWidth;
		height: 100%;
		background: $color;
	}
	
	.logo {
		margin: 30px auto 0;
		width: 100px;
		height: $logoHeight;
	}
	
	.menuList {
		margin-top: 50px;
		li {
			text-align: center;
			color: #fff;
			font-size: $menuFontSize;
			margin: 60px auto;
		}
	}
	
	.commonTop {
		height: $titleHight;
		color: #fff;
		font-size: $titleFontSize;
		line-height: $titleHight;
		background: $topColor;
		position: absolute;
		width: 100%;
		z-index: 100;
		.fa{
			font-size:$menuEnlarger;
		}
		.commonTitle {
			text-align: center;
		}
		.commonMenuBtn {
			position: absolute;
			left: 0;
			top: 0;
			height: $titleHight;
			width: 60px;
			text-align: center;
			font-size: 18px;
		}
	}
	.leftSlideMenuShow {
		animation: leftSlideMenuShow 0.15s linear 0s 1 normal;
		animation-fill-mode: forwards;
	}
	
	.leftSlideMenuHide {
		animation: leftSlideMenuHide 0.15s linear 0s 1 normal;
		animation-fill-mode: forwards;
	}
	
	@keyframes leftSlideMenuHide {
		from {
			left: $menuWidth;
		}
		to {
			left: 0;
		}
	}
	
	@keyframes leftSlideMenuShow {
		from {
			left: 0;
		}
		to {
			left: $menuWidth;
		}
	}
</style>
<style lang="scss">
	
</style>
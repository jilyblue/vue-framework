<template>
	<div>
		<div>
			<h1 @click="clickBtn">上传</h1>
			<h1 @click="subBtn">提交</h1>
			<div class="imgList">
				<img v-for="one in showImgList" :src="one.dataurl" />
			</div>
		</div>
		<hr />
		<div>
			<h1 @click="touBtn">头像</h1>
			<img :src="touSrc" />
		</div>
	</div>
</template>

<script>
	import imageUpload from '../src/library/imageUpload'
	import imageCouper from '../src/components/tools/imageCouper'
	export default {
		created() {
			this.upload = imageUpload();
		},
		data() {
			return {
				upload: null,
				touSrc: ''
			}
		},
		computed: {
			showImgList() {
				return this.upload.imageList;
			}
		},
		methods: {
			clickBtn() {
				this.upload.addImage();
			},
			subBtn() {
				var formData = new FormData();
				for (let i in this.upload.imageList) {
					formData.append("image", this.upload.imageList[i].file, i + '.jpeg');
				}
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/server', true);
				xhr.send(formData);
			},
			touBtn() {
				imageCouper((dataurl, file) => {
					this.touSrc = dataurl;
				});
			}
		}
	}
</script>

<style lang="scss">
	h1 {
		font-size: 30px;
	}
	
	.imgList {
		img {
			width: 100px;
		}
	}
</style>
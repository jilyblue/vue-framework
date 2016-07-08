<template>
	<div class="imageCouperBox">
		<img id="imageCouper" class="imageCouper" />
		<div @click="subCouper" class="imageSub">确定</div>
		<i @click="closeCouper" class="fa fa-close closeCouper"></i>
	</div>
</template>
<style lang="scss">
	.imageCouperBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.imageCouper {
		width: 300px;
		height: 300px;
	}
	
	.imageSub {
		padding: 10px 20px;
		background: #fff;
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translate3d(-50%, 0, 0);
	}
	
	.closeCouper{
		padding: 10px;
		position: fixed;
		right: 5px;
		top: 5px;
		color: #fff;
		font-size: 35px;
	}
</style>
<script>
	import Cropper from 'cropperjs'
	require('cropperjs/dist/cropper.min.css');

	let cropper;

	let dataURLtoBlob = dataurl => {
		let arr = dataurl.split(',');
		let mime = arr[0].match(/:(.*?);/)[1];
		let bstr = atob(arr[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	}

	export default {
		ready() {
			let image = document.getElementById('imageCouper');
			cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				dragMode: 'move',
				guides: false,
				cropBoxMovable: false,
				cropBoxResizable: false,
				autoCropArea: 0.9,
			});
			let blobURL = URL.createObjectURL(this.file);
			cropper.reset().replace(blobURL);
		},
		methods: {
			subCouper() {
				let dataurl = cropper.getCroppedCanvas({
					width: 200,
					height: 200
				}).toDataURL('image/jpeg');
				let blob = dataURLtoBlob(dataurl);
				this.$destroy(true);
				this.reFn && this.reFn(dataurl, blob);
			},
			closeCouper(){
				this.$destroy(true);
			}
		}
	};
</script>
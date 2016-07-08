let imageCompress = (file, size, fn) => {
	let image = new Image();
	let reader = new FileReader();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	reader.onload = event => {
		let result = event.target.result;
		if (result.substring(5, 10) != "image") {
			image.src = result.replace(/(.{5})/, "$1image/jpeg;");
		} else {
			image.src = result;
		}

		image.onload = () => {
			let upImgWidth = image.width;
			let upImgHeight = image.height;
			let afterHeight, afterWidth;
			if (upImgWidth > size) {
				afterHeight = size * upImgHeight / upImgWidth;
				afterWidth = size;
			} else {
				afterHeight = upImgHeight;
				afterWidth = upImgWidth;
			}
			canvas.setAttribute("height", afterHeight);
			canvas.setAttribute("width", afterWidth);
			ctx.drawImage(image, 0, 0, upImgWidth, upImgHeight, 0, 0, afterWidth, afterHeight);
			let dataurl = canvas.toDataURL("image/jpeg");
			let blob = dataURLtoBlob(dataurl);
			fn && fn(dataurl, blob);
		}
	}
	reader.readAsDataURL(file);
}
let dataURLtoBlob = dataurl => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export default imageCompress
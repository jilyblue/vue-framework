import compress from '../uitl/imageCompress'

class Upload {
	constructor() {
		this._imageList = [];
		this.input = document.createElement('input');
		this.input.type = 'file';
		this.input.addEventListener('change', event => {
			compress(event.target.files[0], 640, (dataurl, file) => {
				this._imageList.push({
					dataurl,
					file
				});
				this.input.value = '';
			});
		});
	}
	addImage() {
		let evt = document.createEvent('HTMLEvents');
		evt.initEvent('click', true, true);
		this.input.dispatchEvent(evt);
	}
	deleteImage(i){
		this._imageList.splice(i, 1);
	}
	set imageList(value) {
	}
	get imageList() {
		return this._imageList;
	}
};

let imageUpload = () => new Upload();

export default imageUpload
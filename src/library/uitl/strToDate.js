

let reg = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;

function toDate(str) {
	if (/^\d{4}\d{2}\d{2}$/.test(str)) {
		str += '000000'
	}
	if (reg.test(str)) {
		let v = reg.exec(str);
		v.shift();
		return new Date(v[0], v[1]-1, v[2], v[3], v[4], v[5]);
	}
	return new Date();
}
export default toDate;

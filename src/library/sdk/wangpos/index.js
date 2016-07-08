import dateformat from 'dateformat'
import getData from '../../uitl/strToDate'
import {
	Loading
} from '../../../components/tools/popup'

let printFinishedFn, scanFinishedFn, magneticReaderFn, magneticReaderTimeStamp;
window.printFinished = function() {
	Loading.hide();
	printFinishedFn && printFinishedFn();
};
window.scanFinished = function(result) {
	scanFinishedFn && scanFinishedFn(result);
};
let timer;
if (window.magneticReader && window.magneticReader.getMagneticReader) {
	timer = setInterval(function() {
		let result = window.magneticReader.getMagneticReader();
		if (result && result != '') {
			magneticReaderFn && magneticReaderFn(result);
		}
	}, 500);
}

function Print(str, fn) {
//	return fn && fn();
	Loading('打印中...');
	printFinishedFn = fn;
	window.printer && window.printer.printContent && window.printer.printContent(str + '\n\n\n\n\n\n\n');
}
Print.JF = function(member, user, fn) {
	/*let printList = ['会员姓名：' + member.memberName,
		'会员手机：' + member.mobile,
		'消费门店：' + user.storeName + '\n小票号：' + member.ticketNo,
		'实收金额：' + member.orderAmount + '\n消费时间：' + dateformat(getData(member.orderDate), 'yyyy-mm-dd'),
		'提交时间：' + dateformat(member.submitDate, 'yyyy-mm-dd HH:MM:ss')
	];*/
	let printList = ['会员姓名：' + member.memberName,
		'消费门店：' + user.storeName + '\n小票号：' + member.ticketNo,
		'实收金额：' + member.orderAmount + '\n消费时间：' + dateformat(getData(member.orderDate), 'yyyy-mm-dd'),
		'提交时间：' + dateformat(member.submitDate, 'yyyy-mm-dd HH:MM:ss')
	];
	console.log(printList.join('\n'));
	Print(printList.join('\n'), fn);
}
Print.CP = function(coupon, user, fn) {
	let printList = ['核销成功',
		'优惠券名称：' + coupon.couponName,
		'优惠券号：' + coupon.couponInstanceCode,
		'--------------------------------',
		'核销门店：' + user.storeName + ' \n核销时间：' + dateformat(getData(coupon.usedTime), 'yyyy-mm-dd HH:MM:ss')
	];
	if(coupon.memberName){
		printList.push('会员姓名：' + coupon.memberName);
	}
	/*if(coupon.memberMobile){
		printList.push('会员手机号：' + coupon.memberMobile);
	}*/
	console.log(printList.join('\n'));
	Print(printList.join('\n'), fn);
}
Print.CPL = function(couponList, member, user, fn) {
	let printList = ['核销成功'];
	let date = new Date();
	for (let i = 0; i < couponList.length; i++) {
		let coupon = couponList[i];
		printList.push('优惠券名称：' + coupon.couponName);
		printList.push('优惠券号：' + coupon.couponInstanceCode);
		printList.push('--------------------------------');
	}
	printList.push('核销门店：' + user.storeName);
	printList.push('核销时间：' + dateformat(date, 'yyyy-mm-dd HH:MM:ss'));
	/*printList.push('会员姓名：' + member.memberName + ' \n会员手机号：' + member.mobile);*/
	printList.push('会员姓名：' + member.memberName);
	console.log(printList.join('\n'));
	Print(printList.join('\n'), fn);
}

function Scaner(fn) {
	scanFinishedFn = fn;
	window.scaner && window.scaner.scanContent && window.scaner.scanContent();
}

function MagneticReader(timeStamp, fn) {
	magneticReaderFn = fn;
	magneticReaderTimeStamp = timeStamp;
}
MagneticReader.stop = function(timeStamp) {
	if (magneticReaderTimeStamp === timeStamp) {
		magneticReaderFn = null;
	}
}

export {
	Print,
	Scaner,
	MagneticReader
}
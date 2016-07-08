import Vue from 'vue'
import jsbarcode from '../../uitl/JsBarcode.code128.min'

Vue.directive('bar-code', {
	bind: function() {
		let div = document.createElement('div');
		let divCon = document.createElement('div');
		let divText = document.createElement('div');
		divText.style.cssText = "text-align: center;font: 20px monospace;";
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		divCon.appendChild(svg);
		divCon.appendChild(divText);
		div.appendChild(divCon);
		div.style.cssText = 'position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(255,255,255,0.95);display:none;';
		divCon.style.cssText = 'transform: translate3d(-50%, -50%, 0) rotate(-270deg);position: absolute;top: 50%;left: 50%;';
		document.body.appendChild(div);
		this.el.onclick = function() {
			div.style.display = 'block';
			divText.innerText = this.value;
			jsbarcode(svg, this.value, {
				lineColor: '#222',
				background: 'rgba(0,0,0,0)',
				width: 3,
				displayValue: false
			});
		}.bind(this);
		div.onclick = function(){
			div.style.display = 'none';
		}
		this._div = div;
	},
	update: function(newValue) {
		this.el.innerHTML = '';
		this.value = newValue;
		this.el.style.cssText = "text-align: center;font: 20px monospace;";
		let contentsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		jsbarcode(contentsvg, newValue, {
			lineColor: "#222",
			background: 'rgba(0,0,0,0)',
			height: 50,
			displayValue: false
		});
		this.el.appendChild(contentsvg);
		if(this.modifiers.val){
			let divText = document.createElement('div');
			divText.innerText = newValue;
			this.el.appendChild(divText);
		}
		
	},
	unbind: function(){
		document.body.removeChild(this._div);
	}
})
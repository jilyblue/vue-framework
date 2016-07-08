# vue-framework

`例子没怎么写完等以后有时间再补充吧`

> some components by Vue.js

## Build Setup

``` bash
# 下载
npm install vue-framework

# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build

```

## 用法

# 公共模板

`vue_framework/src/components`

- 模板目录
	- [framework 框架](#framework)
		- [phone](#phone)
			- [LeftSlideMenu.vue](#LeftSlideMenu)
	- [tools](#tools)
		- [popup 弹框组件](#popup)

<div id="framework"></div>
## framework 框架

布局框架

<div id="phone"></div>
### phone

提供移动端框架

<div id="LeftSlideMenu"></div>
#### LeftSlideMenu.vue

左侧滑动菜单

##### 使用方法:

导入LeftSlideMenu
给Vue对象添加components 引用

```javascript
	import LeftSlideMenu from '~ LeftSlideMenu.vue';
	
	var vm = {
		components: {
			LeftSlideMenu
		}
	}
```

##### 在模板中引用

```
	<left-slide-menu></left-slide-menu>
```

LeftSlideMenu需要提供一个配置 option 和一个展示内容的 slot, slol 为 content

##### option 配置:

```javascript
	{
		title: '',   //标题
		letfBtn: {
			icon : '',	//左上的按钮,默认为展开左侧的菜单栏
			click : fn 	//修改左上按钮后,触发该回掉
		},
		menus: [	 //左侧展示的菜单列表
			{
				title: '菜单名',
				url: '路由地址'
			}
		]
	}
```

##### 引用实例:

```html
	<left-slide-menu :options="options">
		<div slot="content" style="height: 100%;">
			<router-view :title.sync="options.title">
			</router-view>
		</div>
	</left-slide-menu>
```

##### 默认样式
```css
	//菜单背景颜色
	$color: #006600 !default;
	
	//头部背景色
	$topColor: #2cb300 !default;
	
	//头部高度
	$titleHight: 60px !default;
	
	//左侧菜单宽度
	$menuWidth: 160px !default;
	
	//菜单字体大小
	$menuFontSize: 16px !default;
	
	//头部字体大小
	$titleFontSize: 14px !default;
	
	//左侧logo高度
	$logoHeight: 100px !default;
	
	//左侧logo宽度
	$logoWidth: 100px !default;
	
	//组测logo背景图
	$logo: url(../../../assets/logo.png) !default;
	
	//左侧按钮字体大小
	$menuEnlarger: 1em !default;
```

<div id="tools"></div>
## tools

工具组件

<div id="popup"></div>
### popup

弹框组件

#### 使用方法

导入 popup
```javascript
	import {
		MessageBox,
		Loading,
		Prompt
	} from '~ popup'
```

1. MessageBox 提示框
	
	具体参考: [vue-msgbox](https://github.com/ElemeFE/vue-msgbox)
	
	alert
	```javascript
		MessageBox.alert(message, title, options).then(function(action) {
		...
		});
	```
	confirm
	```javascript
		MessageBox.confirm(message, title, options).then(function(action) {
		  ...
		});
	```
	prompt
	```javascript
		MessageBox.prompt(message, title, options).then(function(value, action) {
		  ...
		});
	```

2. Loading 加载框
	
	```javascript
	
		//显示加载框
		Loading.show();
		//隐藏加载框
		Loading.hide();
	```

3. Prompt 漂浮提示框
	
	```javascript
		Prompt('msg');
	```	

# js 资源

`client_framework/src/library`

- js目录
	- [dataSource 数据加载](#dataSource)
	- [paging 分页加载](#paging)
	- [directive Vue指令](#directive)
		- [barCode 条码](#barCode)
		- [citySelect 城市选择](#citySelect)
		- [mobiscroll 日期组件(手机滚动基础组件)](#mobiscroll)
		- [validate 数据校验](#validate)
	- [filter Vue过滤器](#filter)
		- [city 城市过滤器](#city)
		- [curreny.js 城市过滤器](#curreny)
		- [date.js 城市过滤器](#date)
		- [gender.js 城市过滤器](#gender)
		- [language.js 城市过滤器](#language)
	- [SDK SDK工具](#sdk)
		- [wangpos jsSDK](#wangpos)

<div id="dataSource"><div>

## dataSource

	提供数据加载的配置

### 使用方法

导入

```javascript
	import dataSource from '~ dataSource'
```

初始化

```javascript
	let urlList = {
		getCoupon: {
			//默认 false
			isTest: true,
			//allUrl: "http://aaaa",	 可选配置,配置不同域名下的调用,不支持测试,配置后url失效
			url: "/getCoupon",
			//配置缓存的次数,当参数和url一样的时候从缓存获取数据,缓存数据可以使用的次数
			//默认0 不缓存
			cacheCount: 20,
			//配置同url下不同参数的缓存个数
			//默认1缓存1个
			cacheMore: 2,
			//默认post
			type: 'post'
		}
	}
	let test = 'http://120.26.221.15/mockjsdata/5';
	let bulid = '/scrm-pe-wechat';
	dataSource.init(urlList, bulid, test);
```

调用

```javascript
	getData('getCoupon', paramet, successFn, errorFn);
```

监听

```javascript
	dataSource.before(function() {
		...
	});
	dataSource.after(function(data) {
		...
	});
```
	
<div id="paging"><div>
## paging

导入

```javascript
	import paging from '~ paging'
```

初始化

```javascript
	paging(option);
```

初始化参数

[dataSource 参考这里](#dataSource) 
```javascript
	{	
		//错误监听
		error() {},
		//成功监听
		success() {},
		//调用后台数据使用的方法
		dataSource() {},
		//调用参数
		params: {},
		//页码
		pageNo: 1,
		//每页条数
		pageSize: 10,
		//dataSource,调用使用,参考dataSource
		urlKey: '',
		//后台返回数据的拼接路径
		dataFrom: null
	}
```

初始化对象提供的属性方法

```javascript
	//请求的所有分页数据
	paging.dataList
	
	//最后一次请求的完整数据
	paging.data
	
	//获取下一页数据
	paging.next()
```

<div id="directive"><div>
## directive
指令

> 参考Vue指令,指令基本都是全局的引用

<div id="barCode"><div>
### barCode

#### 使用方法

参数为需要生成二维码的内容

```html
	<svg v-bar-code="888888"></svg>
```

`20116-7-5 修改ios不能现实数字的问题`


```html
	<div v-bar-code="888888"></div>
```


如需要现实条码下侧数字则使用

```html
	<svg v-bar-code.val="888888"></svg>
```

`20116-7-5 修改ios不能现实数字的问题`

```html
	<div v-bar-code.val="888888"></div>
```

<div id="citySelect"><div>
### citySelect

#### 使用方法

请配合city filter 一起使用展示数据

```html
	<input v-city-scroll type="text" placeholder="点击选择城市" readonly="" />
```

<div id="mobiscroll"><div>

### mobiscroll

#### 使用方法

创建初始化参数

```javascript
 	let data = {
		theme: 'mobiscroll',
		display: 'bottom',
		lang: 'zh',
		defaultValue: new Date(),
		max: new Date()
	}
```

添加指令,请配合 date filter 一起使用展示数据

```html
	<input type="text"  v-date-scroll="date" placeholder="点击选择日期" readonly="" />
```

<div id="filter"><div>
## filter
> Vue 过滤器

<div id="city"><div>
### city

geoId 转换 省市,双向过滤

```html
	<span>{{geoId | city}}</span>
```

<div id="curreny"><div>
### curreny
转换保留两位小数, 双向过滤
```html
	<span>{{288 | currencyDisplay}}</span>
```

<div id="date"><div>
### date
参数为转换的格式
1. date 
	
	```html
		<span>{{date | date 'yyyy-mm-dd'}}</span>
	```
2. yyyymmdd

	支持8位和14位

	```html
		<span>{{'19990811' | date 'yyyy-mm-dd'}}</span>
	```
	
<div id="gender"><div>
### gender

性别转换,1 -> 男, 其他 -> 女

```html
	<span>{{1 | gender}}</span>
```

<div id="language"><div>
### language

语言现实转换,en -> 英文, 其他 -> 中文

```html
	<span>{{1 | language}}</span>
```

<div id="sdk"><div>
#SDK
第三方设备相关
<div id="wangpos"><div>
## wangpos 

#### 使用说明

导入

```javascript
	import {
		Scaner,
		Print,
		MagneticReader
	} from '../../library/sdk/wangpos'
```

1. Scaner

	调用扫码组件,扫码成功后进入会掉函数
	
	```javascript
		Scaner(function(value) {
		...
		});
	```
	
2. Print

	调用打印组件
	
	```javascript
		Print('printText');
	```

3. MagneticReader

	 调用磁条拉卡
	 
	 启用
	 > 第一个参数是监听的唯一key, 建议采用时间戳
 
	 > 参数2是回调函数返回拉卡的结果
	 
	```javascript
		MagneticReader(timeStamp, function(value) {
		...
		});
	```
	
	停用
	
	 >参数是启用时传入的唯一key
	 
	```javascript
		MagneticReader.stop(timeStamp);
	```
	
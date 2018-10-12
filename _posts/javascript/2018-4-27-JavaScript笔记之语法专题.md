---
layout:     post
title:      JavaScript笔记之语法专题
subtitle:   
date:       2018-4-27
author:     xiezht
header-img: 
catalog: true
tags: 
    - JavaScript
---

## 1. 异步操作概述

### 1.1 单线程模型

单个脚本只在一个线程上运行。

### 1.2 同步任务和异步任务

同步任务：未被引擎挂起，在主线程上排队执行。

异步任务：不进入主线程，进入任务队列。

### 1.3 任务队列和事件循环

事件循环：引擎**检查挂起的异步任务，是否已经完成任务并且可以进入主线程。**循环检查的机制，就叫做事件循环。

### 1.4 异步操作的模式

* 回调函数：

	+ 简单易理解实现

	+ 阅读、维护难。高度耦合。流程难以追踪。

* 事件监听

	foo.on('done', fn);
	function foo() {
		setTimeout(function() {
			foo.trigger('done');
		}, 1000);
	}

* 发布/订阅模式

信号中心

publish

subscribe

	jQuery.subscribe('done', fn);

	function foo() {
		setTimeout(function() {
			jQuery.publish('done');
		}, 1000);
	}

	jQuery.unsubscribe('done'. fn);

### 1.5 异步操作的流程控制

嵌套执行？

* 串行执行
	
	var items = [1,2,3,4,5,6];
	var results = [];

	function async(arg, callback) {
		console.log("arg is " + arg + ", return after 1 second.");
		setTimeout(function() {
			callback(arg*2);
		}, 1000);
	}
	function final(value) {
		console.log("finished.", value);
	}
	function series(item) {
		if(item) {
			async( item, function (result) {
				results.push(result);
				return series(items.shift());
			});
		} else {
			return final(results[results.length-1]);
		}
	}
	series(items.shift());

* 并行执行

	var items = [1,2,3,4,5,6];
	var results = [];

	function async(arg, callback) {
		console.log("arg is " + arg + ", return after 1 second.");
		setTimeout(function() {
			callback(arg*2);
		}, 1000);
	}

	 function final(value) {
		console.log("finished.", value);
	}

	items.forEach(function(item) {
		async(item, function(result) {
			results.push(result);
			if (results.length === items.length) {
				final(...);
			}
		});
	});

* 串行和并行的结合

	var items = [1,2,3,4,5,6];
	var results = [];
	var running = 0;

	function async(arg, callback) {
		console.log("arg is " + arg + ", return after 1 second.");
		setTimeout(function() {
			callback(arg*2);
		}, 1000);
	}

	 function final(value) {
		console.log("finished.", value);
	}

	function launcher() {
		while (running < limit && items.length > 0) {
			var item = items.shift();
			async( item, function(result) {
				results.push(result);
				running--;
				if (items.length > 0) {
					launcher();
				} else if (running == 0) {
					final(results);
				}
			});
			running++;
		}
	}

	launcher();

## 2. 定时器

向任务队列添加定时任务。

### 2.1 setTimeout(func, delay)

对象的函数：this的丢失。

* 匿名函数

* 绑定

### 2.2 setInterval()

任务开始之间的间隔。

无限次定时执行 -> 实现轮询。

### 2.3 clearTimeout(), clearInterval()

### 2.4 防抖动deBounce函数

利用定时器，**减少短时间内触发的的Ajax事件**

	$('.textarea').on('keydown', debounce(ajaxAction, 2500));

	function debounce(fn, delay) {
		var timer = null;

		return function() {
			var context = this;
			var args = arguments;
			clearTimeout(timer);
			timer = setTimeout( function() {
				fn.apply(context, args);
			}, delay);
		};
	}

**Note：this的指向**

### 2.5 运行机制

setTimeout和setInterval的运行机制：**将指定代码移出本轮事件循环**，等待下一轮事件循环。

回调函数必须等本轮事件循环的所有同步任务都执行完，才会开始执行。

	setTimeout(foo, 3000);
	veryLongTask();

### 2.6 setTimeout(foo, 0)

等到当前脚本的同步任务全部处理完之后，执行回调函数。

即在下一轮事件循环开始之时执行。

**调整事件的发生顺序**，如冒泡事件。

	var input = document.getElementById('myButton');

	input.onclick = function A() {
		setTimeout(function B() {
			input.value += ' input';
		}, 0);
	};

	document.body.onclick = function C() {
		input.value += ' body';
	}


**用户定义的回调函数，通常在浏览器的默认动作之前触发**

如用户输入文本，keypress事件在浏览器接受文本之前触发。

	document.getElementById('myEle').onKeypress = function () {
		var self = this;
		setTimeout(function () {
			self.value = self.value.toupperCase();
		}, 0);
	}

**划分计算量大，耗时长的任务/块，分别放到setTimeout(f, 0)里面执行。**

如大量DOM操作。

	var timer;

	function func() {
		timer = setTimeout(func, 0);
		div.style.backgroundColor = color;
		if (i++ == limit) clearTimeout(timer);
	}
	timer = setTimeout(func, 0);


## 3. Promise对象

JS异步操作解决方案，为异步操作提供同一接口。

代理。充当异步操作和回调函数之间的中介。

设计思想：所有异步任务都返回一个Promise实例。实例有then方法，指定下一步的回调函数。

	var p1 = new Promise(f1);
	p1.then(f2);

	(new Promise(step1))
	.then(step2)
	.then(step3)
	.then(step4);


### 3.1 Promise对象的三种状态

* 异步操作未完成（pending）

* 异步操作成功（fulfilled）

* 异步操作失败（rejected）


### 3.2 Promise构造函数

	new Promise(function(resolve, reject) {
		...
	});

### 3.3 Promise.prototype.then()

	.then(f1, f2);

第一个参数为异步操作成功的回调函数，第二个是异步操作失败时的回调函数。

Promise对象的报错具有传递性。

#### 用法


### 3.4 Promise的实例应用

#### 加载图片

	var preloadImage = function(path) {
		return new Promise(function(resolve, reject) {
			var image = new Image();
			image.onload = resolve;
			image.onerror = reject;
			image.src = path;
		});
	}

#### Ajax



---
layout:     post
title:      JavaScript笔记之面向对象编程（2）
subtitle:   
date:       2018-4-23
author:     xiezht
header-img: 
catalog: true
tags: 
    - JavaScript
---

## 1. prototye

继承：子对象拥有父对象的属性和方法。代码复用。

JS通过原型对象prototype实现继承。

* 概述
	
	+ 构造函数缺点

	+ prototype属性的作用

	+ 原型链

	+ constructor属性

* instanceof运算符

### 1.1 prototype概述

#### 1.1.1 构造函数缺点

实例对象之间无法共享属性。

#### 1.1.2 prototype属性的作用

属性和方法定义在原型上，实例对象就能共享。

每个函数都有一个prototype对象，指向一个对象。

构造函数生成实例时，该属性自动成为实例对象的原型。

	function Animal(name) {
		this.name = name;
	}
	Animal.prototype.color = "white";

	var cat1 = new Animal("A");
	var cat2 = new Animal("B");

	cat1.color;
	cat2.color;

原型对象变动实时体现在所有实例对象。

在原型上定义方法，作用与属性相似。

### 1.1.3 原型链

原型链上溯终点：Object.prototype。

Object.protype的原型是null。

Object.getPrototypeOf()方法。

	Object.getPrototypeOf(Object.prototype);

读取属性->对象本身->原型链

上溯->性能开销

**overriding**：优先读取本身属性。

**构造函数的prototype属性指向一个数组 -> 实例对象可以使用数组方法。**

	var MyArray = function () {};

	MyArray.prototype = new Array();
	MyArray.prototype.constructor = MyArray;

	var mine = new MyArray();
	mine.push(1, 2, 3);
	mine.length // 3
	mine instanceof Array // true

### 1.1.4 construct属性

construct属性默认指向prototype属性所在的构造函数 -> 查看产生实例对象的构造函数
-> 从一个实例对象新建另一个实例

	function F() {}
	var f = new F()
	f.constructor === F;
	F.prototype.constructor;

	
	function Constr() {}
	var x = new Constr();
	var y = new x.constructor();
	y instanceof Constr;	// true

	// ------------------------
	Constr.prototype.createCopy = function () {
		return new this.constructor();
	};

**prototype修改**一般要**同时修改constructor属性修改。**

**Obj.constructor.name**得到构造函数的名称。


## 2.Object对象与继承

## 3.面向对象编程的模式

## 4.面向对象编程的模式






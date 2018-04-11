---
layout:     post
title:      JavaScript笔记
subtitle:   
date:       2018-3-18
author:     xiezht
header-img: 
catalog: true
tags: JavaScript
---

# JavaScript Notes
***

## 作用域
***
对C、C++语言而言，其作用域是块级作用域。简单地用代码说明一下

	if (true) {
		int a = 1;
	}
	cout << a << endl;
	//  报错

报错的原因是a声明在if的大括号内，其作用域在该块中。因此在外部无法访问。

对ES5的规范而言（ES6定义了块级作用域），JS只有全局作用域和函数作用域两种。

在函数外部声明的为全局变量，可以在全局范围访问。函数内部声明的变量为局部变量，外部无法读取。

**需要注意的是：作用域指的是在定义时的作用域，而非执行（特指函数变量）时的作用域**

以下面的代码为例子：

	var num = 10;
	var func = function() {
		console.log(num);
	}
	var func2 = function(anotherFun) {
		var num = 11;
		anotherFunc();
	}
	func2(func);
	//  输出结果：10

函数变量func在定义的时候是在全局范围，因此，其内部能访问的作用域也就是全局，其内部的console.log(num)语句的num变量就是全局的num。 而非执行时的作用域——func2函数内部。


## 函数参数
***
函数参数类型时原始类型（Number, String, Boolean）时，传递方式为传值传递，函数内部对参数的操作不会影响外部。

函数参数类型为复合类型（Array, Object, Function）时，传递方式是传址传递。类似与C++的引用，可以在函数内部修改并影响外部。

*如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。*

因为形式参数的值是一个地址，重新对其进行赋值，并不会改变地址内的数据。类似于C对指针的重新赋值，原来内存地址的数据并不会因此消失。



## 闭包
***
简单的理解：一个定义在函数内部的函数。

闭包的用处：
* 读取函数内部的变量
* 让变量保存在内存中

	function counter(start) {
		return function() {
			return strat++;
		}
	}
	var inc1 = counter(0);
	var inc2 = counter(10);
	inc1(); // 0
	inc1(); // 1
	inc2(); // 10
	inc2(); // 11

闭包使得函数counter的内部环境一直存在于内存中。

* 封装对象的私有属性和私有方法


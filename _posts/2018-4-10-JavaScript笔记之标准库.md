---
layout:     post
title:      JavaScript笔记之标准库
subtitle:   
date:       2018-4-19
author:     xiezht
header-img: 
catalog: true
tags: 
    - JavaScript
---

# 对象

## Object对象

其他对象都继承自Object对象，是Object的实例。

Object对象的方法：Object的方法和Object的实例方法。

## Array对象

* splice()
* sort()
* map()
* forEach()
* filter()

---

* some()
* every()

---

* reduce()
* reduceRight()

---

* indexOf()
* lastIndexOf()

* 方法的链式使用

## 包装对象和Boolean对象

与三种原始类型对应的原生对象。Number，String，Boolean。

将三个对象作为构造函数（使用new），可以将原始类型的值转为对象。

不使用new时，数据类型转换。

**包装对象可以使用Object对象提供的原生方法**

* valueOf()
* toString()

### 原始类型自动转换

原始类型的值，可以调用各种对象的方法和参数。（JS引擎自动转换并在使用后销毁）

	var str = 'hello world;
	s.x = 123;
	s.x;	//  undefined

**上述例子，创建临时对象->为临时对象添加属性->销毁临时对象->创建另一个临时对象->访问其x属性->属性未定义**

想为字符串添加属性，只有在String.prototype上定义。


### 自定义方法

在包装对象的原型上添加自定义方法和属性。

### Boolean

* 构造函数使用

	if (new Boolean(false)) {	//  ture
	}
	(new Boolean(false)).valueOf();	//  false

**Why true?**

所有对象的布尔值都是true。

* 类型转换作用
	
	//  false的例子
	Boolean(undefined);
	Boolean(null);
	Boolean(0);
	Boolean('');
	Boolean(NaN);
	Boolean(false);

	//  true的例子
	Boolean(1);
	Boolean('false');
	Boolean([]);
	Booelean([]);
	Boolean({});
	Boolean(function() {});
	Boolean(/foo/);

new Boolean()与Boolean()的不同情况。

	if (new Boolean(false));
	if (Boolean(false));
	if (new Boolean(null));
	if (Boolean(null));


* 双重否定运算符（!!）


## Number对象

### 属性

* Number.POSITIVE_INFINITY
* Number.NEGEATIVE_INFINITY
* Number.NaN
* Number.MIN_VALUE
* Number.MAX_SAFE_INTEGER
...

### Number对象的实例方法


* Number.prototype.toString()

* Number.prototype.toFixed()

* Number.prototype.toExponential()

* Number.prototype.toPrecision()


### 自定义方法


## String对象

### 静态方法

String.fromCharCode()

### 实例对象的属性和方法

* length属性

* charAt()

* charCodeAt()

* concat()

* slice()

* subString()

* substr()

* indeOf() lastIndexOf()

* trim()

* toLowerCase() toUpperCase()

* localeCompare()

* match()

可以使用正则表达式作为参数

* search()

返回值为匹配的第一个位置。

可以使用正则表达式作为参数。

* replace()

可以使用正则表达式作为参数。

* split()

可以使用正则表达式作为参数。



## RegExp对象

正则表达式：表达文本模式/字符串结构的方法，类似字符串的模板，常常用作按照“给定模式”匹配文本的工具。

### 创建正则表达式

字面量方式：编译时创建

构造函数方式：运行时创建

* 修饰符：i,g,m

### 使用方法

* regex.test(string);

* string.match(regex);

### 正则对象的属性与方法

#### 属性

* 修饰符相关
	+ ignoreCase
	+ global
	+ multiline

* 修饰符无关
	+ lastIndex：（只对同一个正则表达式有效）
	+ source

* 方法

	+ test()
	+ exec()
		- 返回值：数组（input，index）
		- lastIndex与g修饰符

* 字符串对象的相关方法

	+ String.prototype.match()：
		- 无g修饰符：匹配成功返回一个数组，匹配失败返回null。
		- 有g修饰符：一次性返回所有匹配成功的结果。
		- lastIndex属性对该方法无效

	+ String.prototype.search()
		- 返回第一个匹配结果的index
		- lastIndex对该字符串对象方法无效

	+ String.prototype.replace()

	+ String.prototype.search()

	+ String.prototype.split()
		- 匹配规则：默认贪婪匹配
		- 组匹配结果
	

### 匹配规则

#### 字面量字符与元字符

* 元字符
	+ 点字符： .
	+ 位置字符： 
		- ^ 表示字符串开始位置
		- $ 结束位置
	+ 选择符
		- |

#### 转义符

12个转义字符。

使用RegExp方法生成正则对象，需要使用两个斜杆。因为字符串内部需要转义一次，正则对象需要转义一次。

#### 特殊字符

#### 字符类
	
	//  examp;e
	[xyz];

+ 脱字符： ^

+ 连字符： -

#### 预定义模式

某些常见模式的简写方式。

	+ \d
	+ \D
	+ \w
	+ \W
	+ \s
	+ \S
	+  
	+ \B

#### 重复类

* {n}
* {n, }
* {n,m}

#### 量词符

* ？ 等同于{0,1}

* * 等同于{0,}

* + 等同于 {1,}


#### 贪婪模式

	/a+/;	//贪婪模式
	/a+?/;	//模式结尾添加？，非贪婪模式


* +？
* \*?
* +?

#### 修饰符

* g修饰符

* i修饰符

* m修饰符

多行模式，会修改^ 和 $的行为。

例子：

	/world$/.test('hello world\n');	// false
	/world$/m.test('hello world\n');	// true

	/^b/m.test('a\nb');	// true


#### 组匹配

* 基本用法

	//  example
	/fred+/.test('fredd')	//  true
	/(fred)+/.test('fredfred')	//  true

	var m = 'abcabc'.match(/(.)b(.)/);
	m;
	//  ['abc', 'a'，'c'];

**使用组分配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容**

可以在正则表达式内使用\n引用括号匹配的内容。括号可以嵌套。

	/y((..)\2)\1/.test('yababab');	//  true

匹配网页标签

	var tagNameReg = /<([^>]+)>[^<]*<\/\1>/;
	tagNameReg.exec("<b>bold</b>")[1];
	//  'b'

	//  带属性的标签的正则表达式
	var tag = /<(\w+)(^>)*>(.*?)<\/\1>/g;



* 非捕获组

	(?:x)

不返回该组匹配的内容。即返回内容中不包含这个括号对应的组匹配。

	var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

	var url = /(?:http|ftp):\/\/([^\r\n]+)(\/[^\r\n]*)?/;


* 先行断言

	x(?=y)

x只有在y前面才匹配。y不会计入匹配结果。

	/\d+(？=%)/

* 先行否定断言

x(?!y)

x只有不在y前面才匹配，y不会被计入返回结果。

	/\d+(?!%)/


## JSON对象

### JSON格式

用于数据交换的文本格式。

* 符合JS原生语法，可以由解释引擎直接处理。

每个JSON对象都是一个值。

* 简单类型的值
* 复合类型的值

JSON对值的类型和格式的规定：

* 复合类型的值只能是数组/对象，不能是函数、RegExp、Date
* 简单类型：字符串、数值(十进制)、布尔值、null。不能使用NaN，Infinity、-Infinity和undefined
* 字符串必须使用双引号表示，不能使用单引号
* 键名加双引号

### JSON.stringify()

* undefined，函数，XML对象 -> null
* 正则对象 -> {}
* 忽略不可遍历的属性

* 第二个参数
	+ 数组，指定需要转为字符串的属性。
	+ 函数，更改stringify的返回值。
		- 递归处理

	function change(key, value) { ... }


	var o = {a: 1};
	
	function foo(key, value) {
		if (typeof === 'object') {
			return {b: 2};
		}
		return value*2;
	}
	
	JSON.stringify(o, f);
	//  结果："{"b": 4}"

		- 若返回undefined 或者无返回值，则该属性被忽略。
* 第三个参数
	- 增加JSON字符串的可读性

### toJSON方法

* 对象自定义的JSON方法 -> JSON.stringify()使用其返回值

* 通过toJSON方法为正则对象设置转化为字符串的方法。

	RegExp.prototype.toJSON = RegExp.prototype.toString;
	JSON.stringify(/foo/);  " "/foo/" "


### JSON.parse()

	try {
		JSON.parse(...);
	} catch() {
		...
	}



**(待补充)**
---
## Math对象
## Date对象
## console对象
## 属性描述对象


---
layout:     post
title:      JavaScript笔记之面向对象编程
subtitle:   
date:       2018-4-20
author:     xiezht
header-img: 
catalog: true
tags: 
    - JavaScript
---

## 关于对象

### 面向对象编程OOP

将真实世界的各种复杂的关系，抽象为多个对象，由对象之间的分工与合作 -> 模拟真实世界。

### 对象

* 单个实物的抽象。

* 一个容器，封装了属性和方法。
	+ 属性 -> 对象状态
	+ 方法 -> 对象行为


## 构造函数

构造函数：对象的模板。
	* 用来生成实例对象的函数。
	* 描述对象的基本结构。

构造函数内部的this：代表所要生成的对象实例。

使用new命令。

## new命令

执行构造函数，返回一个实例对象。

new之后的函数调用：
* 创建空对象，作为返回的对象实例
* 将该空对象的原型指向构造函数的prototype属性
* 将空对象复制给函数内部的this关键字
* 开始执行构造函数内部的代码

操作一个空对象（this），将其构造为所需的形式。

对普通函数使用new，即函数内部没有this关键字，返回一个空对象。

构造函数内部return语句返回一个**对象**时（必须是对象），new命令返回该对象而非this对象。

new命令的内部流程：

	function _new(constructor, params) {
		//  arguments对象转为数组
		var args = [].slice.call(arguments);
		//  取出构造函数
		var constructor = args.shift();
		//  创建空对象，继承构造函数的prototype属性
		var context = Object.create(constructor.prototype);
		//  执行构造函数
		var result = constructor.apply(context, args);
	
		return (typeof result === 'object' && result != null)? result : context;
	}
	
	var actor = _new(Person, 'John', 28);


### new.target属性

函数内部使用new.target属性。

new命令调用函数时，在内部使用该属性，该属性指向当前函数。

	function foo() {
		console.log(new.target === f);
	}

	foo();	// false;
	new foo();	//  true;


## this关键字

返回属性或者方法“当前”所在的对象。

对象的属性可以赋给另一个对象 -> 属性所在的当前对象是可变的 -> this的动态指向。

	var a = {
		name: 'zhangsan',
		describe: function() {
			return 'name is ' + this.name;
		}
	};

	var b = {
		name: 'lisi'
	};

	b.describe = a.describe;
	b.describe();	//  "name is lisi"

	
	//  在网页编程使用this
	//  this指向当前对象--文本框
	<input type="text" name="age" onChange="validate(this, 18);">


this指向函数运行环境/对象。

js的运行环境动态切换。

全局环境->window对象。

### 使用

#### 全局环境

->window对象

#### 构造函数

->实例对象

#### 对象的方法

直接在对象上调用方法

	var obj = {
		foo: function() {
			console.log(this);
		}
	};
	debugger();
	obj.foo();	//  obj


**值得思考的例子**

	(obj.foo = obj.foo)();	//  window
	// 等价于
	(obj.foo == function(){
		console.log(this);
	})();
	// 等同于
	(function(){
		console.log(this);
	})();

	(false || obj.foo)();	//  window

	(1, obj.foo)(); 	// window

obj：M1
obj.foo：M2

在全局环境下取出M2进行了运算，然后直接在全局环境执行运算结果。

直接访问的obj.foo的内存地址。而不是经过obj的内存调用foo。



### 需要深入了解的

* 作用域

* 调用点

* 绑定规则

	+ 1. 默认绑定

	function foo() {
		console.log( this.a );
	}
	var a = 2;
	foo();	// 2

		- 严格模式下，this默认绑定为undefined

	+ 2. 隐含绑定

		- 调用点是否有环境对象。

		- 对象属性引用链最后一层影响调用点。

		- 隐含地丢失

	+ 3. 明确绑定

		- call 和 apply
		
		- 硬绑定

	+ 4. new 绑定

* 判定this

**绑定规则的优先顺序**

* 绑定的特例

	+ 扩散数组作为多参数：apply

	+ curry参数：bind。 

		- 创建一个实质上忽略this的硬绑定，而预先设置一些或者所有参数的函数。
	
		- bind(..)的一个能力是，任何在第一个this绑定参数之后被传入的参数，默认地作为当前函数的标准参数。


	function foo(x, y) {
		console.log("x: " + x + ", y: " + y);
	}

	foo.call(null);

	foo.apply(null, [arg1, arg2]);

	var bar = foo.bind(null, a);
	bar(b);

* **使用更安全的this**

DMZ对象。

	var DMZ = Object.create(null);

* 间接

创建对函数的间接引用。如赋值。

	(p.foo = o.foo)();

p.foo = o.foo的结果值是一个刚好指向底层函数对象的引用，起作用的调用点就是foo()，而非p.foo。

被调用函数的**内容**而非其调用点的strict mode，决定默认绑定的this的值，是global对象还是undefined。

* 软化绑定

为默认绑定提供不同的默认值（NOT global/undefined）。


	if(!Function.prototype.softBind) {
		Function.prototype.softBind = function(obj) {
			var fn = this,
			curried = [].slice.call(arguments, 1),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" && this === window) || (typeof global !== "undefined" && this === global)
					) ? obj : this,
					curried.concat.apply(curried, arguments)
				);
			};
			bound.prototype = Object.create(fn.prototype);
			return bound;
		};
	}

在函数调用时检查this，如果是global或者undefined，就使用预先指定的默认值（obj），否则保持不变。

	function foo() {
		console.log("name: " + this.name);
	}

	var obj = {name: "obj"};
	var obj2 = {name:"obj2"};
	var obj3 = {name:"obj3"};

	var fooOBJ = foo.softBind( obj );

	fooOBJ();

	obj2.foo = foo.softBind(obj);	//  手动绑定到obj2
	obj2.foo();					//  obj2

	fooOBJ.call(obj3);			//  obj3  手动绑定到obj3

	setTimeout(obj2.foo, 10);	// obj 退回软绑定



* 词法this

ES6：箭头函数

箭头函数从封闭它的作用域function或者flobal作用域中采用this绑定。

箭头函数的词法绑定无法被覆盖。

	function foo() {
		return (a)=>{
			console.log(this.a);
		};
	}

	var obj1 = { a: 1};
	var obj2 = { a: 2};

	var bar = foo.call(obj1);
	bar.call(obj2);		//  1，不是2

箭头函数在词法上捕获foo()调用的this。

foo()被this绑定到obj1。

bar：被返回箭头函数的一个引用。被this绑定到obj1。

**self = this**
	
	function foo() {
		var self = this;
		setTimeout( function() {
			console.log( self.a);
		}, 100 );
	}
	var obj = {
		a: 2
	};
	foo.call(obj);	// 2


'use strict'

// 类式继承
// function SuperClass () {
//     this.number = 111
//     this.arr = ['html', 'css', 'js']
// }

// function subClass () {}

// subClass.prototype = new SuperClass()

// var ins1 = new subClass()
// var ins2 = new subClass()

// // ins1.__proto__.number = 1
// ins1.number = 222
// ins1.arr.push('c++')

// console.log(ins1.number)
// console.log(ins2.number)
// console.log(ins1.arr)
// console.log(ins2.arr)
// console.log(ins1.prototype == ins2.prototype)

// 组合式继承
// 父类
function SuperClass(name) {
    this.name = name
    this.books = ['html', 'css', 'js']
}
// 父类原型共有方法
SuperClass.prototype.getName = function() {
    console.log(this.name)
}
// 子类
function SubClass(name, time) {
    SuperClass.call(this, name)
    this.time = time
}
// 类式继承
SubClass.prototype = new SuperClass()
// 子类原型共有方法
SubClass.prototype.getTime = function() {
    console.log(this.time)
}

var ins1 = new SubClass('js book', 2018)
var ins2 = new SubClass('as book', 2010)

console.log(ins1 instanceof SuperClass)

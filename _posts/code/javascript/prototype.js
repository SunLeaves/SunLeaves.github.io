// // 添加Array原型方法，删除数组中重复的元素，返回被删除的重复元素的数组

Array.prototype.distinct = function() {
  var ret = []
  for (let i = 0; i < this.length; i++) {
    for (let j = i+1; j < this.length;) {
      if (this[i] === this[j]) {
        ret.push(this.splice(j, 1))
      } else {
        j++
      }
    }
  }
}

var arr = ['a', 'b', 'c', 'd', 'f', 'a', 'a', 'd']
var result = arr.distinct()
console.log(arr, result)


// // 请填充代码，使mySort()能使传入的参数按照从小到大的顺序显示出来。

function mySort() {
    var tags = new Array();//使用数组作为参数存储容器
    
    tags = Array.prototype.slice.call(arguments)
    tags.sort(function(prev, next) {
      return prev - next
    })
    // 返回已经排序的数组
    return tags
}

//传入参数个数不确定
var result = mySort(50,11,16,32,24,99,57,100)
console.info(result)//显示结果


// // js实现用户登陆验证的代码

// // function getCheckObject() {

// //   var isValidUsername = function(tName) {
// //     return false;
// //   }

// //   var isValidPassword = function(password) {
// //     var isValidLength = password.length > 6
// //   }

// //   return {
// //     'isValidUsername': isValidUsername,
// //     'isValidPassword': isValidPassword
// //   }
// // }
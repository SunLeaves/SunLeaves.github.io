
// 浏览器扩展

// 1. 选择符API

// 1.1 querySelector()
// Document, Element
// return 

var body = document.querySelector("body")
var ele = body.querySelector("div.selected")


// 1.2 querySeletorAll()
// Document, DocumentFragment, Element
// return Nodelist/null

var selecteds = document.querySelectorAll()

// 1.3 Element.matchesSelector()
// Element


// 2. 元素遍历
//  忽略文本节点和注释
// childElementCount
// firstElementChild
// lastElementChild
// previousElementSibling
// nextElementSibling

var child = element.firstElementChild
while (child != element.lastElementChild) {
    processChild(child)
    child = child.nextElementSibling
}


// 3. HTML5

// 3.1 与类相关的补充
// getElementsByClassName()

var eles = document.getElementsByClassName('username current')
var childEles = document.getElementById("selected").getElementsByClassName('used')

// classList
// DOMTokenList实例
// add(value)
// contains(value)
// remove(value)
// toggle(value)

// 不使用classList修改class
var classNames = div.classNames.split(/\s+/)

var pos = -1, len = classNames.length
for (var i = 0; i < len; i++) {
    if (classNames[i] == 'user') {
        pos = i
        break
    }
}
classNames.splice(pos, 1)
div.classNames = classNames.join(' ')

// 使用classList
div.classList.remove('disabled')
div.classList.add('current')
div.classList.toggle('user')

if (div.classList.contains('bd')) {
    dosomething()
}

// 3.2 焦点管理
// focus()
// docuemnt.activeElement
// hasFocus()

// 3.3 HTMLDocument的变化
// document.readyState: loading, complete
// document.compatMode: 兼容模式
// document.head
if (document.readyState == 'complete') {
    dosomething()
}

var head = document.head || document.getElementsByTagName('head')[0]

// 3.4 字符集属性
// document.charset
// document.defaultCharsest

// 3.5 自定义属性
// data- 前缀
ele.dataset.value

// 3.6 插入标记
// innerHTML属性
// outerHTML属性
// insertAdjacentHTML方法: beforebegin afterbegin beforeend afterend

ele.innerHTML = '_<script>alert(\'OK\');<\/script>'

// 内存与性能问题

// scrollIntoView()


// 4. 专有扩展

// 4.1 文档模式

// 4.2 children vs childNodes

// 4.3 contains()
// document.documentElement.compareDocumentPosition()

function contains (refNode, otherNode) {
    if (typeof refNode.contains == 'function' &&
        (!client.engine.webkit || client.engine.webkit >= 522)) {
        return refNode.contains(otherNode)
    } else if (typeof refNode.compareDocumentPosition == 'function') {
        return !!(refNode.compareDocumentPosition(otherNode) & 16)
    } else {
        var node = otherNode.parentNode
        do {
            if (node === refNode) {
                return true
            } else {
                node = node.parentNode
            }
        } while (node !== null)
        return false
    }
}

//  4.5 滚动


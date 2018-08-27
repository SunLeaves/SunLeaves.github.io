
// NodeIterator
// params:
//  root
//  whatToShow
//  filter: NodeFilter
//  entityReferenceExpansion
// methods
//  nextNode()
//  previousNode()

var whatToShow = NodeFilter.SHOW_ELEMENT || NodeFilter.SHOW_TEXT

var filter = {
    acceptNode: function (node) {
        return node.tagName.toLowerCase() == 'p'? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    }
}

var iterator = document.createNodeIterator(root, whatToShow, filter, false)


// TreeWalker
//  parentNode()
//  firstChild()
//  lastChild()
//  nextChild()
//  previousSibling()

var div = document.getElementById('div1')

var filter = function (node) {
    return node.tagName.toLowerCase() == 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
}

var walker = documnet.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, filter, false)

var node = walker.nextNode()

while (node !== null) {
    alert(node.tagName)
    node = walker.nextNode()
}

//  currentNode
walker.currentNode = document.body


// 4. 范围
// range接口

// 检测
var rangeSupport = document.implementation.hasFeature('Range', '2.0')

(typeof document.createRange == 'function')

// 使用
// createRange()
//  startContainer
//  startOffset
//  endContainer
var range = document.createRange()


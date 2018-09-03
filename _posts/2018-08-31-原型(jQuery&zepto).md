---
layout:     post
title:      原型（结合jQuery&zepto）（视频笔记）
subtitle:   
date:       2018-08-31
author:     xiezht
header-img: 
catalog: true
tags: 
    - JavaScript
    - 视频笔记
---

> 解读jQuery & zepto中原型的应用
> 原型如何体现其扩展性

# jQuery & zepto中原型的应用

## zepto

```
(function() {
    var zepto = {}
    function Z(dom, selector) {
        var i, len = dom? dom.length:0
        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    zepto.Z = function(dom, selector) {
        return new Z(dom, selector)
    }
    zepto.init = function(selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }
    var $ = function(selector) {
        return zepto.init(selector)
    }
    
    window.$ = $
    $.fn = {
        css: function(key, value) {}
        html: function(value) {}
    }
    Z.prototype = $.fn

})()
```

## jQuery

```
(function() {
    var jQuery = function(selector) {
        return jQuery.fn.init(selector)
    }

    var init = jQuery.fn.init = function(selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))

        var i, len = dom? dom.lenth:0
        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        css: function() {..},
        html: function() {..}
    }
    init.prototype = jQuery.fn

    window.$ = jQuery
})()
```

# 原型的扩展性

* 为什么将原型方法放在$.fn ？

扩展插件时，将插件的方法放在构造函数的原型里。

```
$.fn.getNodeName = function(name) {..}
```

只有$会暴露在window全局变量。

统一插件接口到 $.fn.pluginName。

# jQuery和zepto的插件机制

# 原型的实际应用

* jQuery & zepto如何使用原型（三方面）

    + 入口函数
    + 构造函数
    + 构造函数的原型




var xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200)
            dosomething()
    }
}

xhr.open('GET', 'url', true)

xhr.responseType = ""
// 指定返回类型
// ""
// "arraybuffer"
// "json"
// "blob"
// "document"
// "text"

xhr.send()

// xhr.abort()

xhr.response

xhr.responseText

xhr.responseXML
//  XML/HTML/null

xhr.overrideMimeType()
//  强制解析

xhr.responseURL

xhr.status
xhr.statusText

xhr.timeout = 30000
xhr.ontimeout = function () {}
xhr.onloadstart = function () {}
xhr.onerror = function () {}
xhr.onabort = function () {}
xhr.onprogress = function (event) {
    event.loaded
    event.total
    event.lengthComputed
}

//  跨域请求时是否发送用户信息，如Cookie, 认证的HTTP头信息，默认false
xhr.withCredentials

xhr.upload.onprogress = function (e) {
    if (e.lengthComputed) {
        progressBar.value = (e.loaded / e.total) * 100
    }
}


xhr.open(method, url, async, user, password)

xhr.send(data? data : null)

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send(data)

navigator.sendBeacon('url', data)





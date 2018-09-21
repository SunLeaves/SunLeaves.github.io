// # NodeJS API

// ## 简单入门

// 拷贝小文件：同步文件读取


var fs = require('fs')

function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src))
}

function main(argv) {
  copy(argv[0], argv[1])
}

main(process.argv.slice(2))


//  大文件拷贝：使用数据流


function copy(src, dst) {
  var rs = fs.createReadStream(src)
  var ws = fs.createWriteStream(dst)
  rs.pipe(ws)
}


// ## Buffer模块

// 二进制数据类型，更接近c++, c的数组。

// String字符串是不可读的，对字符串的修改得到的都是一个新字符串。Buffer具有与String类似的特性，并且可以像c语言数组那样通过index修改某个位置的元素。

// 文件读取 -> Buffer数据

// 直接构造


var bf = new Buffer([0x68, 0x65, 0x6c, 0x6f])


// slice() 返回一个指向原Buffer的某个位置的“指针”


var subBuf = bf.slice(2)


// 修改slice()的返回值会作用于原Buffer


subBuf[0] = 0x99
console.log(buf)


// 拷贝复制：申请新的内存空间


var dup = new Buffer(buf.length)
buf.copy(dup)


// ## Stream数据流模块

// 所有Stream的实例都继承于NodeJS提供d的EventEmitter

// 事件监听方式的拷贝文件：stream.pipe()的实现方式


var rs = fs.createReadStream(src)
var ws = fs.createWriteStream(dst)

rs.on('data', function(chunk) {
  if (ws.write(chunk) === false) {
    rs.pause()
  }
})

rs.on('end', function() {
  ws.end()
})

ws.on('drain', function() {
  rs.resume()
})


// ## File System文件系统

// 异步IO模型

// API分类：

// * 文件属性读写
// * 文件内容读写：fs.readFile，fs.writeFile，fs.readdir，fs.writeFile，fs.mkdir
// * 底层文件操作：fs.open，.read，.write，.close


fs.readFile(pathname, function callback(error, data) {
  if (err) {}
  else {}
})



// 同步版本


try {
  fs.readFileSync(pathname)
} catch (error) {
  // deal with error
}


// ## Path模块

// 简化文件路径操作。

var path = require('path')

// 将传入的路径转换为标准路径

path.normalize(pathname)

// window下

pathname = pathname.replace(/\\/g, '/')
path.normalize(pathname)

// 拼接路径

path.join('foo/', 'baz/', '../bar')

// 扩展名操作

path.extname('foo/bar.js')

// **遍历目录**

// * 递归算法

// * 遍历算法：深度优先+先序遍历

// 同步遍历

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file)

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      callback(pathname)
    }
  })
}

// 异步遍历

function travel(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i])
        fs.stat(pathname, function (err, stats) {
          if (stats.isDirectory()) {
            travel(pathname, callback, function() {
              next(i+1)
            })
          } else {
            callback(pathname, function() {
              next(i+1)
            })
          }
        })
      } else {
        finish && finish()
      }
    }(0))
  })
}


// ## 文件编码

// * UTF8 & GBK
// * 带BOM的UTF8文件？

// BOM：标记文本文件使用的Unicode编码，本身也是一个Unicode字符，位于文件头部

// FE FF ：UTF16BE
// FF FE ：UTF16LE
// EF BB BF ：UTF8

// 去除BOM标记
function readText(pathname) {
  var bin = fs.readFileSync(pathname)

  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3)
  }

  return bin.toString('utf-8')
}

// **GBK to UTF8)**

```
npm install iconv-lite
```

// 单字节编码

// ## 网络操作

// http模块：

// * 作为服务端，创建HTTP服务器
// * 作为客户端，发起HTTP客户端请求

// 服务器使用：

var http = require('http')

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text-plain'})
  response.end('Hello World')
}).listen(8080)

// response对象：可以当作只写数据流来写入数据。

http.createServer(function (req, res) {
  req.on('data', function(chunk) {
    res.write(chunk)
  })
  req.on('end', function() {
    res.end()
  })
}).listen(8080)


// 客户端使用：

var options = {
  hostname: '',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

var request = http.request(options, function (response) {})

request.write('Hello World')
request.end()

// HTTPS

var options = {
  key: fs.readFileSync('./ssl/default.key'),
  cert: fs.readFileSync('./ssl/default.cer')
}

var server = https.createServer(options, function(request, response) {
  // ..
})

server.addContext('foo.com', {
  key: '..',
  cert: '..'
})

server.addContext('bar.com', {
  key: '..',
  cert: '..'
})

// 自制SSL证书？
options = {
  // ..
  rejectUnauthorized: false
}


// ## URL

var url = require('url')

// url -> URL对象

url.parse('..')

// arg[0]: url
// arg[1]: bool, query解析成String/Object
// arg[2]: bool, url不带/带协议头

url.parse('..', true, true)

// URL Object => URL String

url.format({
  // URL Object
  protocol: 'http:',
  host: 'www.example.com',
  pathname: '/p/a/t/h',
  search: 'query=string'
})

// 拼接url

// http://www.example.com/baz
url.resolve('http://www.example.com/foo/bar', '../baz')


// ## Query String

// 参数字符串 <=> 参数Object

var querystring = require('querystring')

querystring.stringify(queryObject)
querystring.parse(queryStr)


// Zlib

// 数据压缩与解压缩模块

var zlib = require('zlib')

// 服务器判断客户端是否支持gzip

if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
  zlib(data, function (err, data) {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Encoding': 'gzip'
    })
    response.end(data)
  })
}


// 客户端判断服务器响应是否使用gzip压缩

var options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',method: 'GET',
  headers: {
  'Accept-Encoding': 'gzip, deflate'
  }
}

http.request(options, function(response) {
  var body = []

  response.on('data', function(chunk) {
    body.push(chunk)
  })

  response.on('end', function() {
    body = Buffer.concat(body)

    if (response.headers['content-encoding'] === 'gzip') {
      zlib.gunzip(body, function(err, data) {
        console.log(data.toString())
      })
    } else {
      console.log(data.toString())
    }
  })
}).end()



// ## Net

// 创建Socket客户端



// ## 进程管理

// ### Process

// 全局对象

// 命令行参数

process.argv.slice(2)

// 程序退出

process.exit(number)

// 标准输入流、输出流

process.stdin,
process.stdout
process.stderr



// ### Child Process

var childprocess = require('child_process')

// 核心：.spawn('cmd', [files], options)

// 第一个参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。
// 第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。
// 第三个参数可选，用于配置子进程的执行环境与行为

var child = childprocess.spawn('node', ['../some.js'])

child.stdout.on('data', function(data) {
  console.log('stdout:', data)
})

child.stderr.on('data', function(data) {

})

child.on('close', function (exitcode) {
  console.log('child process exited with code' + code)
})


// 父子进程通讯

// 父进程让子进程发送SIGTERM信号

var child = childprocess.spawn('node', ['child.js'])
child.kill('SIGTERM')

// 子进程
// child.js

process.on('SIGTERM', function() {
  cleanUp()
  process.exit(0)
})

// NodeJS进程：IPC通讯

// 父进程：

// 父进程设置options的stdio字段，开启IPC通道
var child = childprocess.spawn('node', ['child.js'], {
  stdio: [0, 1, 2, 'ipc']
})
// 在父进程中监听子进程传回的message事件
child.on('message', function() {
  dosomething()
})
// 向子进程发送消息
child.send({
  hello: 'hello'
})

// 子进程：

// 子进程监听父进程发送的message
process.on('message', function(msg) {
  msg.hello = msg.hello.toUpperCase()
  process.send(msg)
})

// 守护进程：

function mySpawn(mainModule) {
  var child = childprocess.spawn('node', [mainModule])
  child.on('exit', function(code) {
    if (code !== 0) {
      mySpawn(mainModule)
    }
  })
}

mySpawn('child.js')

// ### Cluster

// 对child_process的封装，用于处理多核CPU的问题。

// ## 异步编程

// 异步遍历数组，串行处理

(function next(i, len, callback) {
  if(i < len) {
    async(arr[i], function(value) {
      arr[i] = value
      next(i+1, len, callback)
    })
  } else {
    callback()
  }
}(0, lenth, function () {
  // all items had been processed
}))

// 异步遍历数组，并行处理

(function (i, len, count, callback) {
  for (; i < len; i++) {
    (function(i) {
      if (i < len) {
        async(arr[i], function(value) {
          arr[i] = value
          count++
          if (count === len) {
            callback()
          }
        })
      }
    }(i))
  }
}(0, length, 0, function() {
  // all items had been processed
}))


// 异步的异常处理

// 异步函数会打断执行路径，异步函数执行过程中y以及z执行之后产生的异常冒泡到执行路径被打断的位置，如果一直没有被try语句，作为全局y异常抛出

// 通过回调函数捕获异常

function async(dosomething, callback) {
  setTimeout(function() {
    try {
      data = dosomething()
      callback(null, data)
    } catch(err) {
      callback(err)
    }
  }, 0)
}

function callback(err, data) {
  if (err) {
    throw err
  } else {
    processData(data)
  }
}

async(dosomething, callback)


// ## Domain模块

// 一个域就是一个JS运行环境

// 通过process捕获全局异常

process.on('uncaughtException', function(err) {
  console.log('Error: %s', err.message)
})


// 子域，创建JS子运行环境，捕获error事件

var domain = require('domain')

var d = domain.create()

d.on('error', function(err) {
  console.log(err.message)
})

d.run(function() {
  // 在子域内运行异步函数
  async('...')
})


// 强烈建议处理完异常后立即重启程序，而不是让程序继续运行。
// 发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重内存泄漏，也可能表现得很奇怪。


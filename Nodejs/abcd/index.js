#!/usr/bin/env node

var fs=require("fs");
var path=require("path");
fs.readdir("./",function(error,data){
    data.forEach(function(file,index){
        if(path.extname(file)==".css"){
            fs.unlinkSync(file);
            console.log("删除成功");
        }
    })
})














// var http = require('http');
//
// http.createServer(function (request, response) {
//
//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//
//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

//require ()// 引入文件必须加路径  支持相对路径与绝对路径

//cmd 同步模块   amd 异步模块
// async  异步加载  defer  兼容性
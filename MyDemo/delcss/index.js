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
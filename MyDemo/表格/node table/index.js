var express=require("express");
var ejs=require("ejs");
var mysql=require("mysql");
var path=require("path");
var app=express();
app.use(express.static(path.join(__dirname,'static')));
app.set("views",path.join(__dirname,"template"));
app.set("view engine","ejs");
// 数据库
var con=mysql.createConnection({
    host:"sqld.duapp.com",
    user:"0474ed60be254fae9570d7389e698257",
    password:"8a620920b91c421b9a7432dd7ed1afac",
    port:"4050",
    database:"NBSrqXNcheuxOeseNUzX"
})
    con.connect();
app.get("/",function (req,res) {
    res.sendFile(path.join(__dirname,"template/index.html"));
})
app.get("/url",function (req,res) {
    con.query("select * from stu",function (err,result) {
        res.send(JSON.stringify(result));
    })
})
app.get("/update",function (req,res) {
    var id=req.query.id;
    var key=req.query.key;
    var val=req.query.val;
    con.query(`update stu set ${key}='${val}' where id=${id}`,function (err,result) {
        if(result.affectedRows==1){
            res.send("ok");
        }
    })
})
app.get("/del",function (req,res) {
    var id=req.query.id;
    con.query(`delete from stu where id=${id}`,function (err,result) {
        if(result.affectedRows==1){
            res.send("ok");
        }
    })
})
app.get("/add",function (req,res) {
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.sex;
    con.query(`insert into stu (name,sex,age) values ('${name}','${sex}','${age}')`,function (err,result) {
        if(result.affectedRows==1){
            res.send("ok");
        }
    })
})
app.listen(18080);
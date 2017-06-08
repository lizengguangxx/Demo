"use strict";
const express=require('express');
const path=require('path');
const server=express();
const pool=require('./mysql.js');
const fs=require('fs');
const crawler=require('./crawler');
crawler.crawler();
setInterval(crawler.crawler,1000*60*5);

server.use('/static',express.static('./static'));
server.use('/',express.static('./public'));

server.get('/news', (req, res)=> {
    var limit = 10;
    var sql = 'select * from news where cate = ? order by id desc limit ? offset ?';
    pool.query(sql, [req.query.id, limit, (req.query.page - 1) * limit], (err, result)=> {
        if (err) {
            res.json(err.message);
        } else {
            if (!result.length) {
                res.json({state: 400})
            } else {
                res.json({state: 200, data: result});
            }
        }
    });
});
server.get('/*', (req, res)=> {
    res.sendFile(path.resolve('./views/index.html'));
});
server.listen(18080,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log('server is listening @18080')
    }
});

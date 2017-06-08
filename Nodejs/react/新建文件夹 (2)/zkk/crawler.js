"use strict";
const request=require('request');
const cheerio=require('cheerio');
const bloomFilter=require('bloom-filter-x');
const pool=require('./mysql');
const url='http://news.ifeng.com';
function crawler() {
pool.query('select url from news order by id desc limit 5000',(err,result)=>{
    result.forEach(v=>{
        bloomFilter.add(v.url);
    })
});
request.get(url,(err,header,body)=>{
    let $=cheerio.load(body);
    let ent=$('.left_co3').nextAll('script').eq(0).html().trim();
    ent=JSON.parse(ent.slice(ent.indexOf('[')));
    let list=$('.left_co3').nextAll('script').eq(1).html().trim();
    list=JSON.parse(list.slice(list.indexOf('[')).slice(0,-1));
    list.splice(2,0,ent);
    var data=[];
    list.forEach((arr,i)=>{
        arr.reverse().forEach(v=>{
            let t=Array.isArray(v.thumbnail)? v.thumbnail[0]: v.thumbnail;
            if(bloomFilter.add(v.url)){
                data.push([t,v.url,v.title,i+1]);
            }
        })
    });
    if(data.length){
        pool.query('insert into news (thumbnail,url, title,cate) values ?',[data],(err,result)=>{
            if(err){
                console.log(err.message)
            }else{
                console.log(result.affectedRows);
            }
        });
    }else{
        console.log('没有更新的数据');
    }


});
};
module.exports = {crawler:crawler};


"use strict";
var mysql=require('mysql');
const conf=require('./config.json');

const pool=mysql.createPool(conf);
module.exports=pool;
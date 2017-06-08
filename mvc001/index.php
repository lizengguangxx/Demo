<?php
//var_dump($_SERVER); //打印服务器信息
//echo (__DIR__); //根目录路径
define("MVC","yes");
define("ROOT_URL",__DIR__);
define("LIBS_URL",ROOT_URL."/lbs");
define("TPL_INDEX_URL",ROOT_URL."/template/index");
define("TPL_ADMIN_URL",ROOT_URL."/template/admin");
define("HTTP_URL","http://".$_SERVER["SERVER_NAME"].substr($_SERVER["SCRIPT_NAME"],0,strrpos($_SERVER["SCRIPT_NAME"],"/")));
define("FILE_URL","http://".$_SERVER["SCRIPT_NAME"].$_SERVER["SCRIPT_NAME"]);
//echo FILE_URL; http:///2017.2.28mvc/index.php/mvc/index.php //唯一的一个入口路径
define("CSS_PATH",HTTP_URL."/static/css");//常量
define("JS_PATH",HTTP_URL."/static/js");
define("EDIT_PATH",HTTP_URL."/static/edit");
define("IMG_PATH",HTTP_URL."/static/image");
define("FONT_PATH",ROOT_URL."/static/font");
include LIBS_URL."/db.class.php";//主类
include LIBS_URL."/session.class.php";
include LIBS_URL."/main.class.php";//继承
include LIBS_URL."/route.class.php"; //路由
require LIBS_URL."/functions.php";
include LIBS_URL."/code.class.php";
include LIBS_URL."/pages.class.php";
include LIBS_URL."/indexMain.class.php";
require LIBS_URL."/infinite.class.php";
require (LIBS_URL."/smarty-3.1.30/libs/Smarty.class.php"); //模版
$route=new route();
$route->init();
?>
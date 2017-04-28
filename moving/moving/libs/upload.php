<?php
	header("Content-Type:text/html;charset=utf-8");
	$fileInfo=$_FILES["file"];//把文件记录在一个变量
	date_default_timezone_set("Asia/Shanghai");//改变时区
	if(is_uploaded_file($fileInfo["tmp_name"])){//判定有没有这个文件
		if(!file_exists("upload")){//判定有没有这个文件夹
			mkdir("upload/",077,true);//创建文件夹
		}
		$dirname=date("y-m-d");//记录当前时间
		if(!file_exists("upload/".$dirname)){//判定有没有当前时间这个文件夹
			mkdir("upload/".$dirname."/",077,true);//创建该文件夹
		}
		$filename=time().$fileInfo["name"];//文件名
		$path="upload/".$dirname."/".$filename;
		move_uploaded_file($fileInfo["tmp_name"],$path);//上传该文件
		echo "http://localhost/ajax/2.23/upload/".$dirname."/".$filename;//打印出该文件
	}
?>
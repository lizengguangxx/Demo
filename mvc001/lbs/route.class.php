<?php
//	echo $_REQUEST["m"]; 
//	exit;
//路由的方式
class route{
	private static $module; //模块 m 相当于文件夹 
	private static $file; //文件
	private static $action; //方法
	function init(){
		$this->getInfo();
	}
	function getInfo(){
		self::$module=isset($_REQUEST["m"])&&!empty($_REQUEST["m"])?$_REQUEST["m"]:"index";
		self::$file=isset($_REQUEST["f"])&&!empty($_REQUEST["f"])?$_REQUEST["f"]:"index";
		self::$action=isset($_REQUEST["a"])&&!empty($_REQUEST["a"])?$_REQUEST["a"]:"init";
		$file="module/".self::$module."/".self::$file.".class.php";
		if(is_file($file)){ //判断文件
//			echo $file;
			include $file;
			if(class_exists(self::$file)){ //判断类
				$obj=new self::$file();
				if(method_exists($obj,self::$action)){
					$method=self::$action;
					$obj->$method();
				}else{
					echo self::$action."方法找不到";
				}	
			}else{
				echo self::$file."类找不到";
			}
		}else{
			echo $file."文件找不到";
		}
	}
}
?>
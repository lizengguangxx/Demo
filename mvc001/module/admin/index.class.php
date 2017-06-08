<?php
class index extends main{
//	1.进入后台首页
	function init(){
//		echo "init";
//		2.检测是否又权限
//		include "template/admin/index.html";
		if($this->checkLogin()){
			$this->smarty->assign("aname",$this->session->get("aname"));
			$this->smarty->display("admin/index.html");
			$this->session->set("coming","yes");
		}
	}
	function login(){
//		3.登陆
        if($this->session->get("coming")){
        	header("location:index.php?m=admin");
        	exit;
        }
		$this->smarty->display("admin/login.html");
	}
	function reg(){
		$this->smarty->display("admin/reg.html");
	}
	function code(){	
		$code=new code();
		$code->output();
		$session=new session();
        $session->set("code",$code->resultLetter);
	}
	function check(){
        $code=@strtolower($_POST["code"]);
        $session=$this->session;
        if($code!==$session->get("code")){
            $this->jump("index.php?m=admin&f=index&a=login","验证码错误");
            exit;
        }
        $aname=P("aname");
//      $apass=md5(P("apass"));
        $apass=P("apass");
//      echo $apass;
//      exit;
        $db=new db("admin","blog");
        $result=$db->select();
//      echo $result;
//      exit;
       foreach ($result as $v){
            if($v["aname"]==$aname){
//          	echo $v["aname"];
//          	exit;
                if($v["apass"]==$apass){
//              	echo $v["apass"];
//          		exit;
                    $session->set("login","yes");
                    $session->set("aname",$aname);
//                  $session->set("aid",$v["aid"]);
                    $this->jump("index.php?m=admin","登陆成功");
                    exit;
                }
            }
       }
        $this->jump("index.php?m=admin&a=login","登陆失败");
    }
	function logout(){
		 $this->session->clear();
         $this->jump("index.php?m=admin&f=index&a=login","退出成功");
	}
	
}
?>
<?php
//class user extends main{
//	function __construct(){
//		parent::__construct();
//		$this->db=new db("user","blog");
//	}
//	function insert(){
//		$uname=$_POST["uname"];
//		$pid=$_POST["pid"];
//		if($this->db->insert("pid='$pid';uname='$uname'")>0){
//			$this->jump("index.php?m=admin&f=category&a=select","添加成功");
//		}else{
//			$this->jump("index.php?m=admin&f=category&a=select","添加失败");
//		}
//	}
//	function select(){
//		$resul=$this->db->select();
//		$this->smarty->assign("resul",$resul);
//		$this->smarty->display("admin/guanli.html");
//	}
//}
?>
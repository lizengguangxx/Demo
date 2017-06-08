<?php
class category extends main{
	function __construct(){
		parent::__construct();
		$this->db=new db("category","HDExCoZSutUKEDQznFiM");
	}
	function add(){
		$obj=new infinite();
		$obj->tree(0,0,$this->db->connect,"category");//$pid,$flag,$db,$table
		$obj->str;
		$this->smarty->assign("tree",$obj->str);
		$this->smarty->display("admin/add.html");
	}
	
//	function guanli(){
//		$this->smarty->display("admin/guanli.html");
//	}
	function insert(){
		$cname=$_POST["cname"];
		$pid=$_POST["pid"];
		if($this->db->insert("pid='$pid';cname='$cname'")>0){
			$this->jump("index.php?m=admin&f=category&a=add","添加成功");
		}else{
			$this->jump("index.php?m=admin&f=category&a=add","添加失败");
		}
	}
	function select(){
		$resul=$this->db->select();
		$this->smarty->assign("resul",$resul);
		$this->smarty->display("admin/guanli.html");
	}
	function del(){
		$id=$_GET["id"];
		if($this->db->where("cid=".$id)->delete()>0){
			$this->jump("index.php?m=admin&f=category&a=select","删除成功");
		}else{
			$this->jump("index.php?m=admin&f=category&a=select","删除失败");
		}
	}
	
}
?>
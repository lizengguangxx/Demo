<?php
class artshow extends indexMain{
	function __construct(){
		parent::__construct();
		$this->db=new db("shows","HDExCoZSutUKEDQznFiM");
	}
	function show(){
		$obj=new infinite();
         $obj->tree(0, 0, $this->db->connect, "category");
         $this->smarty->assign("tree",$obj->str);
		$this->smarty->display("index/artshow.html");
	}
	function add(){
		$cid=P("cid");
		$stitle=P("stitle");
		$scon=P("scon");
		$uid=$this->session->get("uid");
		if($this->db->insert("insert into shows (cid,stitle,scon,uid) values ('$cid','$stitle','$scon','$uid')")){
			$this->jump("index.php?m=index&f=artshow&a=show","保存成功");
		}else{
			$this->jump("index.php?m=index&f=artshow&a=show","保存失败");
			
		}
	}
}
?>
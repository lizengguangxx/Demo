<?php
class art extends main{
	function __construct(){
		parent::__construct();
		$this->db=new db("shows","HDExCoZSutUKEDQznFiM");
//		$this->db=new db("user","blog");
//		$this->db=new db("category","blog");
	}
	function show(){
   		$result1=$this->db->select("select * from shows");
        $obj=new pages(count($result1),1);
        $this->smarty->assign("pages",$obj->out());
		$result=$this->db->select("select * from shows,user,category where shows.uid=user.uid and shows.cid=category.cid ".$obj->limit);
		$this->smarty->assign("result",$result);
		$this->smarty->display("admin/artshow.html");	
	}
	function info(){
		$sid=$_GET["id"];
		$result2=$this->db->where("sid=$sid")->select();
		$this->smarty->assign("result2",$result2[0]);
		$this->smarty->display("admin/info.html");	
		
	}
	function editinfo(){
		$sid=$_POST["sid"];
		$statu=$_POST["statu"];
		if($this->db->where("sid=$sid")->update("statu=$statu")){
			$this->jump("index.php?m=admin&f=art&a=show","修改成功");
		}else{
			$this->jump("index.php?m=admin&f=art&a=show","修改失败");
			
		}
	}
}
?>
<?php
class love extends indexMain{
	function __construct(){
		parent::__construct();
		$this->db=new db("love","HDExCoZSutUKEDQznFiM");	
	}
	function love(){
		$this->session->set("near",$_GET["near"]);
		if($this->session->get("indexLogin")){
			$uid=$this->session->get("uid");
			$sid=$_GET["sid"];
			if($this->db->insert("uid=$uid;sid=$sid")){
				echo "ok";	
			}
		}else{
			echo "no";
		}
	}
	function quxiaolove(){
		$uid=$this->session->get("uid");
		$sid=$_GET["sid"];
		if($this->db->where("uid={$uid} and sid={$sid}")->delete()){
			echo "ok";
		}else{
			echo "no";
		}
		
	}
}
?>
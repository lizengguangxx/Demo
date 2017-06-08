<?php
class infinite{
	function infinite(){
		$this->str="";
	}
	function tree($pid,$flag,$db,$table,$current=null){
		$flag=$flag+1;
		if($current){
			$sql2="select * from $table where cid=".$current;
			$result2=$db->query($sql2);
			$currentPid=$result2->fetch_assoc()["pid"];
//			echo $currentPid;
		}
		
		$sql="select * from $table where pid=".$pid;
		$result=$db->query($sql);
		while($row=$result->fetch_assoc()){
			$cid=$row["cid"];
			$cname=$row["cname"];
			$str=str_repeat("-",$flag);
			if($current){
				if($cid==$currentPid){
					$this->str.="<option value='$cid' selected='selected'>{$str}{$cname}</option>";
				}
			}
			$this->str.="<option value='$cid'>{$str}{$cname}</option>";
			$this->tree($cid,$flag,$db,$table,$current);
//			
		}
		return $this->str;
	}
	function table($pid,$flag,$db,$table){
//		echo $flag;
		$flag=$flag+1;
		$sql="select * from $table where pid=".$pid;
		$result=$db->query($sql);
		while($row=$result->fetch_assoc()){
			$str=str_repeat('-',$flag);
			$cid=$row["cid"];
			$cname=$str.$row["cname"];
			$pid=$row["pid"];
			$this->str.="<tr>
				<td>$cid</td>
				<td>$cname</td>
				<td>$pid</td>
				<td>
					<a href='delcategory.php?id=$cid'>删除</a>
					<a href='editcategory.php?id=$cid'>编辑</a>
				</td>
			</tr>";
			$this->table($cid,$flag,$db,$table);
		};
		return $this->str;
	}
	
	function tree1($pid,$flag,$db,$table,$current=null){
		$flag=$flag+1;
		$sql="select * from $table where pid=".$pid;
		$result=$db->query($sql);
		while($row=$result->fetch_assoc()){
			$cname=$row["cname"];
			$cid=$row["cid"];
			$pid=$row["pid"];
			$str=str_repeat("-",$flag);
			if($cid==$current){
				$this->str.="<option value='$current' selected='selected'>{$str}{$cname}</option>";
				
			};
			$this->str.="<option value='$current'>{$str}{$cname}</option>";
			$this->tree1($cid,$flag,$db,$table,$current);
//			
		}
		return $this->str;
	}
}
?>
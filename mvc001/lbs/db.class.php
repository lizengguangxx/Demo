<?php
/*
 * 增删改查 
 * */
class db{
	//属性
	public  $hostname="sqld.duapp.com";   //主机地址
	public  $dbname="HDExCoZSutUKEDQznFiM";         //数据库名
    private $username="96e92a9f9ef5455792f89b0fa9a2268a";        //用户名
    private $password="bf32ccb0b39a4151a6d9d85883035177";            //密码
    public  $tablename;              //表名
    public $connect;                //创建数据库保存在此  用来连接数据库
    public  $fileds;                 //保存条件  sql语句中选项
    
    function __construct($tablename="",$dbname=""){
       if($tablename=="" || $dbname==""){
       	  echo "数据库名或表名不能为空";
       	  exit();
       }    
       $this->tablename=empty($tablename)?"demo":$tablename; 
       $this->dbname=$dbname;
       $this->config();     
    }
    
    public function config(){         //配置
       $this->connect=new mysqli($this->hostname,$this->username,$this->password,$this->dbname,4050);  //创建一个数据库
       if(mysqli_connect_errno($this->connect)){
	       echo "连接  MySQL 失败 ";
	       $this->connect->close(); //关闭 释放内存
           exit();
       }
       $this->connect->query("set names utf8");         //编码方式为utf8
       $this->fileds["filed"]=$this->fileds["filed"]?$this->fileds["filed"]:"*";  //当条件为空的时候 让它默认指向*  就是查询语句的where
       $this->fileds["where"]=$this->fileds["order"]=$this->fileds["limit"]="";   //[定义数组]   排序和查询的长度的截取	
    }
    
    public function select($opt=""){ 
      //第一种
      $array=array();
       $sql=empty($opt)?"select ".$this->fileds["filed"]." from ".$this->tablename." ".$this->fileds["where"]." ".$this->fileds["order"]." ".$this->fileds["limit"]:$opt;   //组装sql语句    
       $result=$this->connect->query($sql);       //结果保存起来
       while($row=$result->fetch_assoc()){        //循环直接每条信息
       	    $array[]=$row;                        // 把每条信息赋值给数组输出
       }
       return $array;                             //返回结果 调用的时候能取到
//     return JSON_encode($array);                //将此数组转为节省格式       
      
      /*第二种
      if(strpos($opt,"elect")){
            $sql=$opt;
        }else if(empty($opt)){
            $sql="select ".$this->fileds["filed"]." from ".$this->tablename." ".$this->fileds["where"]." ".$this->fileds["order"]." ".$this->fileds["limit"];
        }else{
            $this->filed($opt);
            $sql="select ".$this->fileds["filed"]." from ".$this->tablename." ".$this->fileds["where"]." ".$this->fileds["order"]." ".$this->fileds["limit"];
        }
        $result=$this->connect->query($sql);
        while($row=$result->fetch_assoc()){
            $array[]=$row;
        }
        return $array; */
   
   
   
    }
    
    public function where($opt=""){
       $sql=empty($opt)?"":"where ".$opt;             //条件为空默认为*
       $this->fileds["where"]=$sql;    
       return $this;                                  //链式调用
    }
    
    public function order($opt=""){                 //排序  asc升 desc降
		$sql=empty($opt)?"":"order by ".$opt;
		$this->fileds["order"]=$sql;
		return $this;
	}
	
	public function limit($opt=""){
		$sql=empty($opt)?"":"limit ".$opt;
		$this->fileds["limit"]=$sql;
		return $this;
	}
    
    public function delete($opt=""){
      	$sql=empty($opt)?"delete from ".$this->tablename." ".$this->fileds["where"]:$opt;
      	$this->connect->query($sql);
      	return $this->connect->affected_rows;
    }
    
    public function update($opt=""){
      	if(empty($opt)){
      		$sql="update ".$this->tablename." set ".$this->fileds["filed"]." ".$this->fileds["where"];
      	}else{
      		if(strpos($opt,"pdate")){      //检测update在$opt中首次出现的位置
      			$sql=$opt;
      		}else{
      			$sql="update ".$this->tablename." set ".$opt." ".$this->fileds["where"];
      		}
      	}
      	$this->connect->query($sql);
		return $this->connect->affected_rows;
    }
    
    public function insert($opt=""){
		if(strpos($opt,"nsert")){
            $sql=$opt;
        }else if(empty($opt)){
//          $this->fileds["filed"]="(".$this->keys.") values (".$this->values.")";
            $sql="insert into ".$this->tablename." ".$this->fileds["filed"];
        }else{
            $this->filed($opt);
//          $this->fileds["filed"]="(".$this->keys.") values (".$this->values.")";
            $sql="insert into ".$this->tablename." ".$this->fileds["filed"];
        }
		$this->connect->query($sql);
		return $this->connect->affected_rows;
    }
    
    public function filed($opt=""){    //查询字段的一些判断
		$sql=empty($opt)?"*":$opt;
		if(strpos($sql,";")){          //检测;在$sql中首次出现的位置   三个参数：1.string(要搜索的字符串。) 2.find(要查找的字符串。) 3.start(在何处开始搜索。)
			$arr=explode(";",$sql);    //explode 把字符串打散为数组   三个参数：1.separator(分割符) 2.string(要分割的字符串。) 3.limit(规定所返回的数组元素的数目,可选)
			$keys="";
		    $values="";
			foreach($arr as $k=>$v){
				$newarr=explode("=",$v);   
				$keys.=$newarr[0].",";
				$values.=$newarr[1].",";	
			}
			$keys=substr($keys,0,-1);
			$values=substr($values,0,-1);
			$sql="(".$keys.") values (".$values.")";
		}else if(strpos($sql,"=")){
			$newarr=explode("=",$sql);
            $this->keys=$newarr[0];
            $this->values=$newarr[1];
		}
		$this->fileds["filed"]=$sql;
		return $this;	
	}
    
  
}
//$db=new db("category","w1610");
//var_dump($db->select());
?>

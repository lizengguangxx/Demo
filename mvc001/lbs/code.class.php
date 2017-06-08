<?php
class code{
	public $letter="abcdeg13445ABCDEF";//分子
	public $currentletter="";
	public $letterNum=4;
	public $width=200;
	public $height=80;
	public $Linemun=10;
//	public $fontUrl;
	public $fontUrl="static/font/bb.ttf";
	public $fontsize=array("min"=>20,"max"=>30);
	public $imgType="png";
	public $img;
	public $pixel=50;
	public $resultLetter;
	public function getColor(){
		$arr[0]=mt_rand(0,128);
		$arr[1]=mt_rand(0,128);
		$arr[2]=mt_rand(0,128);
		return $arr;
	}
	public function getTextcolor(){
		$arr[0]=mt_rand(129,256);
		$arr[1]=mt_rand(129,256);
		$arr[2]=mt_rand(129,256);
		return $arr;
	}
	public function getFont(){
		for($i=0;$i<$this->letterNum;$i++){
			$this->currentletter.=$this->letter[mt_rand(0,strlen($this->letter)-1)];
		}
		$this->resultLetter = strtolower($this->currentletter);
//		echo $this->currentletter;	
	}
	public function output(){
		header("Content-type:image/".$this->imgType);
		$out="image".$this->imgType;
		$this->creat();//1.创建画布-》填充颜色
		$this->creatText();//2.创建文字-》随机-》颜色；
		$this->creatLine();//3.创建干扰线-》随机-》颜色
		$this->creatpixel();
//		$this->
		$out($this->img);
		imagedestroy($this->img);//用完之后销毁
	}
	
	private function creat(){ //创建画布
		$this->img=imagecreatetruecolor($this->width,$this->height);
		$bgarr=$this->getColor();
		$bgcolor=imagecolorallocate($this->img,$bgarr[0],$bgarr[1],$bgarr[2]);
		imagefill($this->img,0,0,$bgcolor);
	}
	private function creatText(){
		$this->getFont();
		$x=$this->width/$this->letterNum; //平均每个宽；
		for($i=0;$i<$this->letterNum;$i++){
			$fontarr=$this->getTextcolor();
			$fontcolor=imagecolorallocate($this->img,$fontarr[0],$fontarr[1],$fontarr[2]);
			$size=mt_rand($this->fontsize["min"],$this->fontsize["max"]);
			$text=imagettfbbox($size,0,$this->fontUrl,$this->currentletter[$i]);
			$y=mt_rand(($text[1]-$text[5]),$this->height);
			$thex=10+($x*$i)+mt_rand(-10,10);
			$angle=mt_rand(-15,15);
			imagettftext($this->img,$size,$angle,$thex,$y,$fontcolor,$this->fontUrl,$this->currentletter[$i]);
		}
	}
	private function creatLine(){
		for($i=0;$i<$this->Linemun;$i++){
			$linetarr=$this->getTextcolor();
//			echo $linetarr[0];
//			exit;
			$linecolor=imagecolorallocate($this->img,$linetarr[0],$linetarr[1],$linetarr[2]);
			$x1=mt_rand(0,$this->width);
//			echo $x1;
			$x2=mt_rand(0,$this->width);
//			echo $x2;
			$y1=mt_rand(0,$this->height);
//			echo $y1;
			$y2=mt_rand(0,$this->height);
//			echo $linecolor;
			imageline($this->img,$x1,$y1,$x2,$y2,$linecolor);
		}
	}
	private function creatpixel(){
//	echo 1;
		for($i=0;$i<$this->pixel;$i++){
			$pixelarr=$this->getTextcolor();
			$pixelcolor=imagecolorallocate($this->img,$pixelarr[0],$pixelarr[1],$pixelarr[2]);
			$x1=mt_rand(0,$this->width);
			$y1=mt_rand(0,$this->height);
			imagesetpixel($this->img,$x1,$y1,$pixelcolor);
		}
	}
	
}
//$img=new code();
//$img->output();
?>
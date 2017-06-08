$(function(){
	var banner=$(".banner");
	var width=$(".banner li").width();
	var a=0;
	var b=0;
	var t=setInterval(move,2000);
	function move(type){
		type=type||"r";
		if(type=="r"){
			b=a+1;
			if(b>=$(".banner li").size()){
				b=0;
			}
			$(".banner li").get(b).style.left=width+"px";
			$(".banner li").eq(a).animate({left:-width},500);
			$(".banner li").eq(b).animate({left:0},500);
			a=b;
		}else if(type=="l"){
			b=a-1;
			if(b<0){
				b=$(".banner li").size()-1;
			}
			$(".banner li").get(b).style.left=-width+"px";
			$(".banner li").eq(a).animate({left:width},500);
			$(".banner li").eq(b).animate({left:0},500);
			a=b;
		}
	}
	$(".banner").hover(function(){
		clearInterval(t)
	},function(){
		t =setInterval(move,2000)
	})
})

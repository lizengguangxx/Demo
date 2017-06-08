document.addEventListener("DOMContentLoaded",function(){
	size(1242);
})
function size(originw){
	//定义rem
	var w=document.documentElement.clientWidth;
	var bili=w/originw*100+"px";
	$("html").css("font-size",bili);
	
}
window.onload=function(){
	//imgbox
	var imgbox=$(".imgbox")[0];
	//开始移动事件
	touch.on(".imgbox","dragstart",function(){
		//删除transition
		imgbox.style.transition="none";
		//记录left的值
		left=getComputedStyle(imgbox,null).marginLeft?parseInt(getComputedStyle(imgbox,null).marginLeft):0;
	})
	//移动事件
	touch.on(".imgbox","drag",function(e){
		imgbox.style.marginLeft=(e.x+left)+"px";
	})
	//停止移动事件
	touch.on(".imgbox","dragend",function(e){
		if(e.direction=="left"){
			//向左滑动的事件
			imgbox.style.transition="all 1s";
			if(e.x<-100||e.factor<0.7){
				//如果滑动距离大于100或者速度大于0.7
				if(parseInt(getComputedStyle(imgbox,null).marginLeft)<(-$(window).width()*2)){
					//如果marginleft最后大于第三屏幕
					imgbox.style.marginLeft=(left)+"px";
				}else{
					imgbox.style.marginLeft=(-$(window).width()+left)+"px";
				}
			}else{
				imgbox.style.marginLeft=(left)+"px";
			}
		}else if(e.direction=="right"){
			//向右滑动的事件
			imgbox.style.transition="all 1s";
			if(e.x>100||e.factor<0.7){
				//如果滑动距离大于100或者速度大于0.7
				if(parseInt(getComputedStyle(imgbox,null).marginLeft)>=0){
					//如果marginleft最后大于第三屏幕
					imgbox.style.marginLeft=(left)+"px";
				}else{
					imgbox.style.marginLeft=($(window).width()+left)+"px";
				}
			}else{
				imgbox.style.marginLeft=(left)+"px";
			}
		}
	})
}

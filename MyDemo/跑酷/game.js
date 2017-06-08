/*
 * 游戏人物
 */
function person(canvas,cobj,runimg,jumpimg){
	this.canvas=canvas;
	this.cobj=cobj;
	//画布位置
	this.x=0;
	this.y=0;
	//人物图片
	this.runimg=runimg;
	this.jumpimg=jumpimg;
	//当前运动状态
	this.status="runimg";
	//下标
	this.state=0;
	//放图片的宽高，前面要用
	this.width=123;
	this.height=105;
}
person.prototype={
	draw:function(){
		//保存当前画布
		this.cobj.save();
		this.cobj.translate(this.x,this.y);
		this.cobj.drawImage(this[this.status][this.state],0,0,123,105,0,0,this.width,this.height);
		//放置在原来的位置
		this.cobj.restore();
	},
	animate:function(num,speed){
		if(this.status=="runimg"){
			//使得state始终在0-7之间
			this.state=num%7;
		}else{
			this.state=0;
		}
		this.x+=speed;
		//大于宽度1/4时位置不变
		if(this.x>=this.canvas.width/3){
			this.x=this.canvas.width/3;
		}
	},
	//跳跃
	dump:function(){
		var that=this;
		var flag=true;
		touch.on(this.canvas,"touchstart",jumps);
		$(document).keydown(function (e) {
			if(e.keyCode==38){
				jumps();
			}else if(e.keyCode==32){
                jumps();
			}
        })
		function jumps(){
            if(!flag){
                return;
            }
            flag=false;
            var jumpt=document.querySelector(".audio1");
            jumpt.play();
            that.status="jumpimg";//变为跳跃
            var du=0;
            var r=120;//半径越大，跳的越大
            var oldy=that.y;//人物的y
            that.state=0;
            t=setInterval(function(){
                du+=10;
                if(du>=180){
                    clearInterval(t);
                    that.status="runimg";//变为跑
                    that.y=oldy;
                    flag=true;
                }
                //跳跃的弧度
                that.y=oldy-Math.sin(du*Math.PI/180)*r;
            },50);
        }
	}
}
/*
 * 游戏障碍物
 */
function hinder(canvas,cobj,hinderimg){
	this.canvas=canvas;
	this.cobj=cobj;
	this.hinderimg=hinderimg;
	this.x=0;
	this.y=0;
	this.state=0;
	this.width=42;
	this.height=58;
}
hinder.prototype={
	draw:function(){
		this.cobj.save();
		this.cobj.translate(this.x,this.y);
		this.cobj.drawImage(this.hinderimg[this.state],0,0,126,170,0,0,this.width,this.height);
		this.cobj.restore();
	},
	animate:function(speed){
		this.x-=speed;
	}
}
/*
 * 粒子动画
 */
function lizi(canvas,cobj,x,y){
	this.x=x;
	this.y=y;
	this.canvas=canvas;
	this.cobj=cobj;
	this.color="red";
	this.r=2+2*Math.random();
	this.speedx=8*Math.random()-4;
	this.speedy=8*Math.random()-4;
	this.speedl=0.3;
}
lizi.prototype={
	draw:function(){
		this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.beginPath();
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
	},
    animate:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=this.speedl;
    }
}
/*
 * 游戏开始
 */
function game(canvas,cobj,runimg,jumpimg,hinderimg,xuetiao,fenshu){
	this.canvas=canvas;
	this.cobj=cobj;
	this.runimg=runimg;
	this.jumpimg=jumpimg;
	this.hinderimg=hinderimg;
	this.xuetiao=xuetiao;
	this.fenshu=fenshu;
	//障碍物数组
	this.hinderArr=[];
	this.speed=10;
	this.xue=200;
	this.fen=0;
	this.t;
	//调用人物的方法
	this.person=new person(this.canvas,this.cobj,this.runimg,this.jumpimg);
}
game.prototype={
	play:function(playtime){
		var that=this;
		var backpos=0;//背景图片把左移动
		var num=0;//控制人物图片的下标
		this.person.dump();
		var times=0;
		var randtime=Math.floor(3+6*Math.random())*1000;
		this.t=setInterval(function(){
			//清空画布
			that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
			//障碍物添加
			times+=50;
			if(times%randtime==0){
				randtime=Math.floor(3+6*Math.random())*1000;
				var hinderObj=new hinder(that.canvas,that.cobj,that.hinderimg);
				hinderObj.state=Math.floor(Math.random()*that.hinderimg.length);
				hinderObj.x=that.canvas.width;
				hinderObj.y=that.canvas.height-hinderObj.height;
				that.hinderArr.push(hinderObj);
				//同一张上不能超过5个障碍物
				if(that.hinderArr.length>5){
					that.hinderArr.shift();
				}
			}
			//全部取出
			for(var i=0;i<that.hinderArr.length;i++){
				that.hinderArr[i].draw();
                that.hinderArr[i].animate(that.speed);
                /*
                 *   @param that.canvas   // 画布
                 *          that.cobj     // 2d对象
                 *   		that.person   // 对象a
                 *   		that.hinderArr[i]  // 对象b
                 */
            	if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
            		if(!that.hinderArr[i].hits){
            			//血
                        var jumpx=document.querySelector(".audio3");
                        jumpx.play();
            			that.xue-=50;
            			$(that.xuetiao).animate({width:that.xue});
            			var arr=[];
					    for(var j=0;j<20;j++){
					        arr.push(new lizi(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2));
					    }
					    var t1=setInterval(function(){
					    	for(var j=0;j<arr.length;j++){
						    	arr[j].draw();
					            arr[j].animate();
					            if(arr[j].r<0){
					                arr.splice(j,1);
					            }
				            }
				            if(arr.length<=0){
				            	clearInterval(t1);
				            }
					    },50)
            			if(that.xue<=0){
                            var jumpk=document.querySelector(".audio4");
                            jumpk.pause();
					    	clearInterval(that.t);
            				$(".zhe").css({"left":0,"top":"100%"}).animate({top:0},function () {
                                var jumpe=document.querySelector(".audio2");
                                jumpe.play();
								$(".end").animate({bottom:"30%"},function () {
                                    var jumpg=document.querySelector(".audio");
                                    jumpg.play();
									$(".fenshu span").html($(".fen span").html()).parent().animate({opacity:1});
                                })
                            });
            			}
            			that.hinderArr[i].hits="hits";
            		}
            	}
                //分数
//                 if(that.hinderArr[i].x+that.hinderArr[i].width<that.person.x&&!that.hinderArr[i].hits){
//                 	if(!that.hinderArr[i].fen){
//                 		that.fen++;
//                 		that.fenshu.innerHTML=that.fen;
//                 	}
// //              	if(that.fen%5==0){
// //              		that.xue+=50;
// //              		that.xuetiao.style.width=that.xue+"px";
// //              	}
//                 	that.hinderArr[i].fen="fen";
//                }
			}
			//画人物
			num++;
			that.person.draw();
			//人物运动
			that.person.animate(num,that.speed);
			backpos-=that.speed;
			//背景运动
			that.canvas.style.backgroundPosition=backpos+"px";
		},playtime)
	}
}
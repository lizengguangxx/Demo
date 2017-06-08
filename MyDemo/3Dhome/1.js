/**
 * Created by Administrator on 2017/6/3.
 */

    //3D效果部分
var tops=document.querySelector("li:nth-child(1)")
var bottom=document.querySelector("li:nth-child(3)")
var front=document.querySelector("li:nth-child(5)")
var box=document.querySelector(".box")
var clientW=window.innerWidth;
var clientH=window.innerHeight;
tops.style.width=tops.style.height=bottom.style.width=bottom.style.height=clientW+"px";
bottom.style.top=-(clientW-clientH)+"px";
//   rotate3d(0,1,0,180deg)  沿那根轴转哪个为1 或者写rotate(180deg)
front.style.transform=`translateZ(${clientW}px) rotate3d(0,1,0,180deg)`;
box.style.transform="translateZ(-800px)";
box.style.transformOrigin="center center 800px";
var startangle=0;
var nowangle=0;
document.onmousedown=function (e) {
    var sx=e.clientX;
    document.onmousemove=function (e) {
        var cx=e.clientX;
        nowangle=cx-sx;
        box.style.transform=`translateZ(-500px) rotateY(${startangle+nowangle}deg)`;
    }
    document.onmouseup=function (e) {
        startangle+=nowangle;
        document.onmousemove=null;
        document.onmouseup=null;
    }
}



// video 部分
var container=document.querySelector(".container");
var video=document.querySelector("video");
var startbtn=document.querySelector(".start");
var reload=document.querySelector(".reload");
var progress=document.querySelector(".progress");
var inner=document.querySelector(".inner");
var now=document.querySelector("#now");
var all=document.querySelector("#all");
var volume=document.querySelector(".volume");
var vol=document.querySelector(".vol");
var volinner=document.querySelector(".volinner");
var bg=document.querySelector(".bg");
var mask=document.querySelector(".mask");
var volicon=document.querySelector(".volume .icon");
var controls=document.querySelector(".controls");
var icon=document.querySelectorAll(".icon");
var fullscreen=document.querySelector(".fullscreen");
var l=progress.offsetWidth;

var startflag=true;
startbtn.onclick=function () {
    if(startflag){
        video.play();
        startbtn.innerHTML="&#xe640;";
    }else{
        video.pause();
        startbtn.innerHTML="&#xe638;";
    }
    startflag=!startflag;
};
reload.onclick=function () {
    video.load();
    inner.style.width=0;
    startbtn.innerHTML="&#xe638;";
    startflag=true;
};
var duration=0;
var nowtime=0;
video.oncanplay=function () {//当浏览器可以播放音频/视频时 //不能用在页面加载后 因为页面加载完时 vodeo早已加载完 不能实现
    duration=video.duration;
    all.innerHTML=time(duration);
};
video.ontimeupdate=function () {  //当目前的播放位置已更改时
    nowtime=video.currentTime;
    now.innerHTML=time(nowtime);
    var width=nowtime/duration;
    inner.style.width=width*100+"%";
};
function time(t) {
    var mins=Math.floor(t/60);
    var secs=Math.floor(t%60);
    return mins+":"+(secs<10?"0"+secs:secs);
}
progress.onmousedown=function(e){
    var ox=e.offsetX; //鼠标按下某位置到(直接或最早事件源)progress开始位置的距离
    var bili=ox/l; //鼠标按下某位置到progress开始位置的距离  与  progress总长的一个比例
    var pos=duration*bili; //当前播放时间的位置 (duration返回当前音频/视频的长度（以秒计）)
    video.currentTime=pos;  //currentTime设置或返回音频/视频中的当前播放位置（以秒计）
    document.onmousemove=function (e) {
//                var ox=e.offsetX;  //onmousemove用e.offsetX;存在Bug
        var ox=e.clientX-progress.offsetLeft;
        var bili=ox/l;
        var pos=duration*bili; //当前播放时间位置 (duration返回当前音频/视频的长度（以秒计）)
        video.currentTime=pos;
    }
    document.onmouseup=function (e) {
        document.onmousemove=null;
        document.onmouseup=null;
    }
}
//解决volinner鼠标移入移出事件多次触发问题(表面效果一样)，换用hover.js写法(先引入)
hover(volume,function () {
    bg.style.display="block";
},function () {
    bg.style.display="none";
    mask.onmousemove=null;
    mask.onmouseup=null;
});
//mask事件调用两次(公用)
function fnvol(e) {
    var oy=e.offsetY;
    oy=oy>=100?100:oy; //音量小块不超出父级
    var v=1-oy/100; //音量值
    video.volume=v; // volume (0-1)	设置或返回音频/视频的音量
    if(v==0){
        volicon.innerHTML="&#xe61e;"
    }else{
        volicon.innerHTML="&#xe607;"
    }
    volinner.style.marginTop=oy+"px";  //marginTop存在Bug  在css中把volinner设置float:left浮动(不影响布局)
}
//给音量区域加遮罩  把事件加到遮罩上 解决offsetY带来的bug
mask.onmousedown=function (e) {
    fnvol(e);
    mask.onmousemove=function (e) {
        fnvol(e);
    }
    mask.onmouseup=function () {
        mask.onmousemove=null;
        mask.onmouseup=null;
    }
}
//同一位置(按钮)发生多次事件 开关格式：
var volfalg=true;
volicon.onclick=function () {
    if(volfalg){
        volicon.innerHTML="&#xe61e;"
        video.muted=true; //muted 设置是否静音
    }else{
        volicon.innerHTML="&#xe607;"
        video.muted=false;
    }
    volfalg=!volfalg;
}
//h5  中requestFullScreen任何东西可变全屏 cancleFullScreen 退出全屏
var fullfalg=true;
fullscreen.onclick=full;
video.ondblclick=full;
document.onkeydown=function (e) {
    if(e.keyCode==27){
        fullfalg=false;
        full()
    }
}
function full() {
    if(fullfalg){
        fullscreen.innerHTML="&#xe625;"
        container.style.width="100%";
        container.style.height="100%";
        controls.style.paddingTop="30px"
        for(let i=0;i<icon.length;i++){
            icon[i].style.fontSize="35px"
        }
    }else{
        fullscreen.innerHTML="&#xe7b5;"
        container.style.width="600px";
        container.style.height="400px";
        controls.style.paddingTop="0px"
        for(let i=0;i<icon.length;i++){
            icon[i].style.fontSize="20px"
        }
    }
    fullfalg=!fullfalg;
    l=progress.offsetWidth;
}



//1.创建表盘
var div = document.createElement("div"); //创建div
var biao=document.querySelector(".scene ul li:nth-child(6)")
div.style.cssText = "width:200px;height:200px;border:5px solid rgb(255, 204, 0); background-size:60% 60%;background-repeat:no-repeat;background-position: center;margin:0 auto;border-radius:50%;position:absolute;"
biao.appendChild(div); //表盘放入body中

//2.创建一圈时刻
for (let i = 0; i < 60; i++) {
    let kd = document.createElement("div");
    kd.style.cssText = "width:3px;height:5px;background:#ccc;position:absolute;left:98px;top:0;transform-origin:2px 100px;"
    let angle = i * 6;
    if (i % 5 == 0) {
        kd.style.height = "10px";
        kd.style.background = "#000";
    }
    kd.style.transform = `rotate(${angle}deg)`;
    div.appendChild(kd);
}

//3.创建中心原点
var cricle = document.createElement("div");
cricle.style.cssText = "width:16px;height:16px;background:#ff6700;border-radius:50%;position:absolute;z-Index:5;left:92px;top:92px;"
div.appendChild(cricle);

//4.创建时针
var hour = document.createElement("div");
hour.style.cssText = "width:60px;height:5px;background:#000;position:absolute;left:100px;top:98px;z-Index:2;transform-origin:left center;"
div.appendChild(hour);

//5.创建分针
var minute = document.createElement("div");
minute.style.cssText = "width:80px;height:3px;background:#000;position:absolute;left:100px;top:99px;z-Index:2;transform-origin:left center;"
div.appendChild(minute);

//6.创建秒针
var second = document.createElement("div");
second.style.cssText = "width:90px;height:1px;background:#ff6700;position:absolute;left:100px;top:100px;z-Index:2;transform-origin:left center;"
div.appendChild(second);

//7.让针转动（需要刷新）
function setTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hour.style.transform = `rotate(${hours/12*360-90+minutes/60*30}deg)`//3点 hour=3 四分之一个一圈   减去所在位置90度
    minute.style.transform = `rotate(${minutes/60*360-90}deg)`
    second.style.transform = `rotate(${seconds/60*360-90}deg)`
}
setTime();

//8.让每隔1s针转动setInterval
setInterval(setTime,1000);
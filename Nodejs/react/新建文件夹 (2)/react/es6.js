
//能够声明局部变量
for(let i=0;i<10;i++){

}


//常量
const pi=3.14;



//连接字符串
let str=12;
let x=`abc${str}ef`;
console.log(x);

var x1=12;
var x2=13;
//let className=(x1>x2)?`list${x1}`:`list${x2}`;
let className=`list${(x1>x2)?x1:x2}`;


//函数
//var fn1=()=>{
//
//}
//返回值是表达式的话加{}；
//返回值是值得话直接写
//返回值是对象的话用（{}）

let database=[
    {id:1,name:'a'},
    {id:2,name:'b'},
    {id:3,name:'c'},
    {id:4,name:'d'},
    {id:5,name:'e'}
];

console.log(database.map(v=>v.name).join(''));

var add=(x,y)=>{
    //return x+y;         等同于   var add=(x,y)=>x+y;
}

var fn3=x=>({x:x});
//只有一个变量可以省略括号


//根据原数组生成一个长度一样的数组

var cc=database.map(function(v,i){

})


class Cat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    c() {
        console.log(this.x);
    }
}
var o = new Cat(1, 2);






















import React, { Component } from 'react';

class Newlist  extends React.Component{
    constructor(){
        super();
        this.state={
            loading:true,
            data:[]
        }
    }
    // 组件的生命周期函数
    componentDidMount(){
        //setTimeout((function(){
        // this.setState({
        // loading:false,
        // data:[{id:1,name:'a'},{id:2,name:'b'}]
        // })
        // }).bind(this),1000);
        // react中this永久性指向组件本身，而非window
        //var that=this;
        fetch('/index/x')
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    loading:false,
                    data:data
                })
            })
    }
    render(){
        var lis=this.state.data.map(v=>(
            <li className="item" key={v.id}>{v.name}</li>
        ))
        /*return(
         <ul>
         {this.state.loading?<div>加载中。。。</div>:null}
         {lis.length?lis:null}
         </ul>
         )*/
        return (
            <ul>
                <div className={this.state.loading?'album_list ':'album_list hide'}>加载中......</div>
                {lis.length ? lis : null}
            </ul>
        );
    }
}
export default Newlist;
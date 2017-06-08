import React, { Component } from 'react';

import Table from 'antd/lib/table';
import { Popconfirm, message } from 'antd';
class Album extends Component {
    constructor() {
        super();
        this.state = {
            //loading:true,
            data: []
        }
    }

    // 组件的生命周期函数
    componentDidMount() {
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
            .then(data=> {
                this.setState({
                    //loading:false,
                    data: data
                })
            })
    }

    del(id) {
        fetch(`/index/y?id=${id}`)
            .then(res=>res.json())
            .then(data=> {
                if(data=='1'){
                    this.setState({
                        data: this.state.data.filter(v=>v.id !== id)
                    })
                    message.success('删除成功');
                }else{
                    message.error('删除失败');
                }
            })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href={`http://www.baidu.com/s?wd=${text}`}>{text}</a>

            },
            {
                title: '歌手名',
                dataIndex: 'artist_name',
                key: 'artist_name'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                <Popconfirm title="确认删除吗?" onConfirm={()=>this.del(record.id)}  okText="Yes" cancelText="No">
                    <a href="#">Delete</a>
                </Popconfirm>
                )
            }];
        return (
            <Table columns={columns} dataSource={this.state.data}/>
        )
    }
}

export default Album;
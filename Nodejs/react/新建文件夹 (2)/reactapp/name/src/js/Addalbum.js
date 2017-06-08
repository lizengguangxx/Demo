import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import Upload from 'antd/lib/upload';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
class Addalbum extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var s='';
            for(var k in values){
                s+=k+'='+values[k]+'&';
            }
            s= s.slice(0,-1);
            if (!err) {
                fetch('/index/z',{
                    method:'POST',
                    //ajax提交表单
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    //带上cookie信息
                    credentials:'same-origin',
                    body:s
                }).then(res=>res.json())
                    .then(data=>{
                        if(data){
                            message.success('添加成功');
                            this.props.form.resetFields();
                        }
                    })
            }
        });
    }
    render(){
        const  {getFieldDecorator} = this.props.form;
        const  style={
            labelCol:{span:3},
            wrapperCol:{span:14},
        };
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="专辑名" {...style}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="id" />
                    )}
                </FormItem>
                <FormItem label="歌手名" {...style}>
                    {getFieldDecorator('artist_name', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input placeholder="请输入专辑名" />
                    )}
                </FormItem>

                <FormItem wrapperCol={{ span: 12, offset: 3 }}>
                    <Button type="primary" htmlType="submit">
                        确定添加
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
const addalbum = Form.create()(Addalbum);
export default addalbum;
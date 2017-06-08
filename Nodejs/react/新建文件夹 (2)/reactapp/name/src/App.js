import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon,Table } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Album from './js/Album';
import Newlist from './js/Newlist';
import addalbum from'./js/Addalbum';
import {BrowserRouter as Router,
        Route,
        Link} from 'react-router-dom';

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {

        return (
            <Router>
            <Layout style={{ height: '100vh' }}>
                <Sider style={{ overflow: 'auto' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">
                            <Icon type="user" />
                            <span className="nav-text">专辑管理</span>
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/news">
                            <Icon type="video-camera" />
                            <span className="nav-text">增加专辑</span>
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/add">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="bar-chart" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="cloud-o" />
                            <span className="nav-text">nav 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="appstore-o" />
                            <span className="nav-text">nav 6</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="team" />
                            <span className="nav-text">nav 7</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="shop" />
                            <span className="nav-text">nav 8</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            <Route exact path="/" component={Album}></Route>
                            <Route path="/news" component={Newlist}></Route>
                            <Route path="/add" component={addalbum}></Route>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
            </Router>
        )
    }
}

class Page extends React.Component{
    render(){
        /*return(
            <div>
                <form action="https://www.baidu.com/s" method="get">
                    <input type="text" name="wd"/>
                    <Button type="primary" htmlType="submit" icon="lock" shape="circle" size="large" loading={true}></Button>
                </form>
            </div>
        )*/
        return(
            <div>
                <SiderDemo/>
            </div>
        )
    }
}
export default Page;

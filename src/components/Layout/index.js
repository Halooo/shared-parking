import React from "react";
import { connect } from "react-redux";
import cookie from "react-cookie";

import { Layout, Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content} = Layout;


import Create from '../Create';
import List from '../List';
import Logout from '../Logout';

@connect((store) => {
    return {
        store,
    }
})


export default class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currTab: 'create',
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    tabChange(e) {
        this.setState({
            currTab: e.key
        })
    }

    render() {
        let tabContent;
        if (this.state.currTab == "create") {
            tabContent = <Create/>
        } else if (this.state.currTab == "list") {
            tabContent = <List/>
        } else if (this.state.currTab == "logout") {
            tabContent = <Logout/>
        } else {
            tabContent = <div></div>
        }

        let responsiveMenu;
        if (this.state.width >= 330) {
            responsiveMenu = <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['create']}
                selectedKeys={[this.state.currTab]}
                onClick={this.tabChange.bind(this)}
                style={{ lineHeight: '48px', background: 'rgba(0,0,0,0.8)' }}
            >
                <Menu.Item key="create" >List A Pass</Menu.Item>
                <Menu.Item key="list" >Find A Pass</Menu.Item>
                <Menu.Item key="logout" style={{float: 'right'}}><Icon type="logout" />Logout</Menu.Item>
            </Menu>
        } else {
            responsiveMenu = <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['create']}
                selectedKeys={[this.state.currTab]}
                onClick={this.tabChange.bind(this)}
                style={{ lineHeight: '48px', background: 'rgba(0,0,0,0.8)' }}
            >
                <Menu.Item key="create" >List Pass</Menu.Item>
                <Menu.Item key="list" >Find Pass</Menu.Item>
                <Menu.Item key="account" style={{float: 'right'}}><Icon type="logout" />Logout</Menu.Item>
            </Menu>
        }
        return (
            <Layout className="layout" style={{height: '100%', background: '#f2f2f2' }}>
                <Header style={{padding: '0', height: '48px'}}>
                    {responsiveMenu}
                </Header>
                <Content style={{ margin: '0 0 auto 0', padding: '0px', flex: 'none'}}>
                    {tabContent}
                </Content>
                <Footer style={{ textAlign: 'center', color: '#ddd' }}>
                    Parking Share ©2016 Created by Hao Sun
                </Footer>
            </Layout>
        )
    }
}

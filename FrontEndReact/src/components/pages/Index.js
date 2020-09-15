import React, { useState } from 'react';
import TodoList from './TodoList/TodoList';
import Profile from './Profile';
import {
    Menu,
    notification,
    Layout,
    Image,
    Affix
} from 'antd';
import { EditFilled, ProfileOutlined, LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import localStorageService from '../../services/localStorageService'
import Logo from './Logo.png';


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export default function Index(props) {
    const [showProfile, setShowProfile] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const showProfilePage = () => {
        setShowProfile(true);
    };
    const showTodoList = () => {
        setShowProfile(false);
    };

    const logout = () => {
        localStorageService.removeToken();
        notification.warning({ message: "You have been logout" });
        props.setRole("guest")
    };

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };



    const menu = (
        <Affix offsetTop={10}>
            <Menu style={{ height: "100%" }} defaultSelectedKeys={['2']} mode="inline">
                <SubMenu key="sub1" title={
                    <span>
                        <ProfileOutlined />
                        <span>Menu</span>
                    </span>
                }
                >
                    <Menu.Item icon={<UserOutlined />} onClick={showProfilePage} key="1">Profile</Menu.Item>
                    <Menu.Item icon={<EditFilled />} onClick={showTodoList} key="2">TodoList</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} onClick={logout} danger key="3">Logout</Menu.Item>
                </SubMenu>
            </Menu>
        </Affix>
    );

    let contents = (<TodoList />);

    if (showProfile) {
        contents = (<Profile />);
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider collapsible={true} style={{ backgroundColor: 'white' }} collapsed={collapsed} onCollapse={onCollapse}>{menu}</Sider>
            <Layout >
                <Header style={{ backgroundColor: "white", padding: 0 }}><Image width="100px" src={Logo} /></Header>
                <div className="Form">
                    <Content>{contents}</Content>
                    <Footer style={{height:"30px"}}><a href="mailto:gigafinagle@gmail.com">Contact my email</a></Footer>
                </div>
            </Layout>
        </Layout>

    )
}

import React, { useState } from 'react'
import TodoList from './TodoList/TodoList';
import Profile from './Profile'
import {
    Menu,
    notification,
    Layout,
    Image,
    Affix
} from 'antd';
import { EditFilled, ProfileOutlined, LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import localStorageService from '../../services/localStorageService'
import Logo from './Logo.png'


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export default function Index(props) {
    const [showTodo, setShowTodo] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    
    const showProfile = () => {
        setShowTodo(false);
    };
    const showTodoList = () => {
        setShowTodo(true);
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
            <Menu style={{ height: "100%" }} defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1" title={
                    <span>
                        <ProfileOutlined />
                        <span>Menu</span>
                    </span>
                }
                >
                    <Menu.Item icon={<UserOutlined />} onClick={showProfile} key="1">Profile</Menu.Item>
                    <Menu.Item icon={<EditFilled />} onClick={showTodoList} key="2">TodoList</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} onClick={logout} danger key="3">Logout</Menu.Item>
                </SubMenu>
            </Menu>
        </Affix>
    );

    let contents = (<Profile />);

    if (showTodo) {
        contents = (<TodoList />);
    };

    return (
        <Layout>
            <Sider collapsible={true} style={{ backgroundColor: 'white' }} collapsed={collapsed} onCollapse={onCollapse}>{menu}</Sider>
            <Layout>
                <Header style={{ backgroundColor: "white" }}><Image width="100px" src={Logo} /></Header>
                <Content>{contents}</Content>
                <Footer>Giga limited</Footer>
            </Layout>
        </Layout>

    )
}

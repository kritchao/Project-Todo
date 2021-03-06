import React, { useState, useEffect } from 'react';
import TodoList from './TodoList/TodoList';
import Profile from './Profile';
import {
    Menu,
    notification,
    Layout,
    Image,
    Affix,
    Typography
} from 'antd';
import { EditFilled, ProfileOutlined, LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import localStorageService from '../../services/localStorageService'
import Logo from './Logo.png';
import Important from './TodoList/Important'

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export default function Index(props) {
    const [showProfile, setShowProfile] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [showImpListpage, setShowImpListPage] = useState(false)
    const [loading, setLoading] = useState(true)

    const showProfilePage = () => {
        setShowProfile(true);
    };
    const showTodoList = () => {
        setShowProfile(false);
        setShowImpListPage(false);
    };

    const showImpList = () => {
        setShowProfile(false);
        setShowImpListPage(true)
    }

    const logout = () => {
        localStorageService.removeToken();
        notification.warning({ message: "You have been logout" });
        props.setRole("guest")
    };

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    useEffect(() => {
        setLoading(false)
    }, [])



    const menu = (
        <Affix offsetTop={10}>
            <Menu style={{ height: "100%" }} mode="inline" theme="dark">
                <Menu.Item disabled icon={<ProfileOutlined />} key="sub1">Menu</Menu.Item>
                <Menu.Item icon={<UserOutlined />} onClick={showProfilePage} key="1">Profile</Menu.Item>
                <SubMenu icon={<EditFilled />} key="sub2" defaultSelectedKeys={['2']} title="Todo List">
                    <Menu.Item onClick={showTodoList} key="2">All Task</Menu.Item>
                    <Menu.Item onClick={showImpList} key="3">Important Task</Menu.Item>
                </SubMenu>
                <Menu.Item icon={<LogoutOutlined />} onClick={logout} danger key="4">Logout</Menu.Item>

            </Menu>

        </Affix>
    );

    let contents = (<TodoList />);

    if (showProfile) {
        contents = (<Profile />);
    } else if (showImpListpage) {
        contents = (<Important />);
    }

    return (
            <Layout style={{ height: "100vh" }}>
                <Sider collapsible={true} style={{ backgroundColor: '#001529' }} collapsed={collapsed} onCollapse={onCollapse}>{menu}</Sider>
                <Layout >
                    <Header style={{ backgroundColor: "white", padding: 0 }}><Image onClick={showTodoList} width="100px" src={Logo} /></Header>
                    <div className="Form">
                        <Content>{contents}</Content>
                        <Footer style={{ height: "30px" }}>
                            <a href="mailto:gigafinagle@gmail.com">Contact my email</a>< br />
                            <Text type='secondary' >  Kritchao Chantakorn</Text>
                        </Footer>
                    </div>
                </Layout>
            </Layout>

    )
}

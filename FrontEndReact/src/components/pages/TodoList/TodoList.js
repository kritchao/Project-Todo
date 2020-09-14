import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    Input,
    Button,
    Row,
    Col,
    Divider,
    Menu,
    notification,
    Layout,
    Image,
    Modal,
    Affix
} from 'antd';
import axios from '../../../config/axios';
import Todo from './Todo';
import { EditFilled, ProfileOutlined, LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import localStorageService from '../../../services/localStorageService';
import Profile from '../Profile';
import Logo from '../Logo.png'

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input

export default function TodoList(props) {
    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");
    const [detailField, setDetailField] = useState("");
    const [showTodo, setShowTodo] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false)
    const [top, setTop] = useState(10);

    const fetchTodoList = async () => {
        const httpResponse = await axios.get("/todo-list");
        setTodoList(httpResponse.data);
    };

    useEffect(() => {
        fetchTodoList();
    }, []);

    const logout = () => {
        localStorageService.removeToken();
        notification.warning({ message: "You have been logout" });
        props.setRole("guest")
    }


    const addTodoItem = async () => {
        if (inputField) {
            await axios.post("/todo-list", { task: inputField, detail: detailField });
        }
        fetchTodoList();
        setVisible(false);
        setInputField("");
        setDetailField("");
    };

    const deleteTodoItem = async (id) => {
        await axios.delete(`/todo-list/${id}`);
        fetchTodoList();
    };
    const showTodoList = () => {
        setShowTodo(true);
    }
    const showProfile = () => {
        setShowTodo(false);
    }
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true)
    };

    let menu = (
        
        <Affix offsetTop={top}>
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

    let contents = (<Profile job={todoList.length} />)
    if (showTodo) {
        contents =

            <div className="Form">
                <Row justify="start">
                    <Col>
                        <Col>
                            <Modal
                                title="Add your Todo List"
                                visible={visible}
                                okText={"Submit"}
                                onOk={addTodoItem}
                                onCancel={handleCancel}
                            >
                                <Row justify="center" style={{ margin: "5px" }}>
                                    <Col span={3}><Text>Title</Text></Col>
                                    <Col span={21}><Input required={true} value={inputField} onChange={(e) => setInputField(e.target.value)} /></Col>
                                </Row>
                                <Row justify="center" style={{ margin: "5px" }}>
                                    <Col span={3}>Detail</Col>
                                    <Col span={21}><TextArea value={detailField} onChange={(e) => setDetailField(e.target.value)}></TextArea></Col>
                                </Row>
                            </Modal>
                        </Col>
                        <Col>
                            <Button type='primary' onClick={showModal} style={{marginLeft:"20%"}} >+ Add todo</Button>
                        </Col>
                    </Col>
                </Row>
                <Divider />
                <Row justify='center'>
                    <List
                        style={{ width: '80%', height: '80hv', backgroundColor: 'white' }}
                        header={<h3 style={{ textAlign: 'left' }}>Your Todo Lists</h3>}
                        bordered
                        dataSource={todoList}
                        renderItem={todo => (
                            <Todo delete={deleteTodoItem} todo={todo} fetchData={fetchTodoList} />
                        )}
                    />
                </Row>
            </div>

    }
    return (
        <Layout>
            <Sider collapsible={true} style={{ backgroundColor: 'white' }} collapsed={collapsed} onCollapse={onCollapse}>{menu}</Sider>
            <Layout>
                <Header style={{ backgroundColor: "white" }}><Image width="100px" src={Logo} /></Header>
                <Content>{contents}</Content>
                <Footer>Giga limited</Footer>
            </Layout>
        </Layout>
    );
}


//<Todo delete={deleteTodoItem} todo={todo} fetchData={fetchTodoList} />
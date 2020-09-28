import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    Input,
    Button,
    Row,
    Col,
    Divider,
    Modal,
    message,
    Affix

} from 'antd';
import axios from '../../../config/axios';
import Todo from './Todo';

const { Text } = Typography;
const { TextArea } = Input

export default function TodoList(props) {
    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");
    const [detailField, setDetailField] = useState("");
    const [visible, setVisible] = useState(false);

    const fetchTodoList = async () => {
        const todoList = await axios.get("/todo-list");
        setTodoList(todoList.data);
    };


    useEffect(() => {
        fetchTodoList();
    }, []);

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
        message.success('success');
    };
    return (
        <div style={{marginBottom:"50px"}}>
            <Row justify="start" style={{ backgroundColor: 'transparent' }}>
                <Col>
                    <Col>
                        <Modal
                            title="Add your Todo List"
                            visible={visible}
                            okText={"Submit"}
                            onOk={addTodoItem}
                            onCancel={() => setVisible(false)}
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

                    </Col>
                </Col>
            </Row>
            <Row justify='center' >
                <div style={{ width: '80%' }}>

                    <List
                        header={<h2 style={{ textAlign: 'left' }}><strong>Your Todo Lists</strong></h2>}
                        bordered={true}
                        dataSource={todoList}
                        renderItem={todo => (
                            <Todo delete={deleteTodoItem} todo={todo} fetchData={fetchTodoList} />
                        )}
                    ><Button type='dashed' onClick={() => setVisible(true)} style={{marginBottom:"20px",marginTop:"20px", width:"90%"}} >+ Add your list</Button></List>
            
                </div>
            </Row>
        </div>

    );
}
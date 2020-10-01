import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    Input,
    Button,
    Row,
    Col,
    Modal,
    message,
    DatePicker,
} from 'antd';
import axios from '../../../config/axios';
import Todo from './Todo';
import moment from 'moment'

const { Text } = Typography;
const { TextArea } = Input;


export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");
    const [detailField, setDetailField] = useState("");
    const [visible, setVisible] = useState(false);
    const [timeField, setTimeField] = useState("")
    const [emptyContent, setEmptyContent] = useState("")

    const fetchTodoList = async () => {
        const todoList = await axios.get("/todo-list/imp");
        setTodoList(todoList.data);
        if (todoList.data.length === 0) setEmptyContent(<p>You don't have any important task.</p>)
        else setEmptyContent("")
    };

    useEffect(() => {
        fetchTodoList();
    }, []);

    const addTodoItem = async () => {
        if (inputField) {
            await axios.post("/todo-list", { task: inputField, detail: detailField, priority: 1, date: timeField })
        };
        fetchTodoList();
        setVisible(false);
        setInputField("");
        setDetailField("");
        setTimeField("");
    };

    const disabledDate = (current) => {
        return current && current < moment()
    }

    const deleteTodoItem = async (id) => {
        await axios.delete(`/todo-list/${id}`);
        fetchTodoList();
        message.success('success');
    };
    return (
        <div style={{ marginBottom: "50px" }}>
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
                                <Col span={4}><Text>Title</Text></Col>
                                <Col span={20}><Input required={true} value={inputField} onChange={(e) => setInputField(e.target.value)} /></Col>
                            </Row>
                            <Row justify="center" style={{ margin: "5px" }}>
                                <Col span={4}>Detail</Col>
                                <Col span={20}><TextArea value={detailField} onChange={(e) => setDetailField(e.target.value)}></TextArea></Col>
                            </Row>
                            <Row justify="center" style={{ margin: "5px" }}>
                                <Col span={4}>Date and Time</Col>
                                <Col span={20}><DatePicker
                                    style={{ width: '80%' }}
                                    format='MMMM Do YYYY, h:mm'
                                    disabledDate={disabledDate}
                                    showTime
                                    onChange={(e) => setTimeField(e)} />
                                </Col>
                            </Row>
                        </Modal>
                    </Col>
                    <Col>

                    </Col>
                </Col>
            </Row>
            <Row justify='center'>
                <div style={{ width: '60%', overflowWrap: 'break-word' }}>

                    <List
                        header={<h2 style={{ textAlign: 'left', maxWidth: '80%' }}><strong>Your Todo Lists</strong></h2>}
                        bordered={true}
                        dataSource={todoList}
                        renderItem={todo => (
                            <Todo delete={deleteTodoItem} todo={todo} fetchData={fetchTodoList} />
                        )}
                    >
                        {emptyContent}
                        <Button type='dashed' onClick={() => setVisible(true)} style={{ marginBottom: "20px", marginTop: "20px", width: "90%" }} >+ Add Important list</Button></List>

                </div>
            </Row>
        </div>

    );
}
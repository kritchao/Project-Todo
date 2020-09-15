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

} from 'antd';
import axios from '../../../config/axios';
import Todo from './Todo';

const { Text } = Typography;
const { TextArea } = Input

export default function TodoList(props) {
    const [todoList, setTodoList] = useState([]);
    const [inputField, setInputField] = useState("");
    const [detailField, setDetailField] = useState("");
    const [visible, setVisible] = useState(false)

    const fetchTodoList = async () => {
        const httpResponse = await axios.get("/todo-list");
        setTodoList(httpResponse.data);
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
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true)
    };
    return (
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

    );
}
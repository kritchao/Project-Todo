import React, { useState } from 'react';
import { Modal, Button, Row, Col, Input, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

function TestPage(props) {
    const [changeInput, setChangeInput] = useState("");
    const [inputField, setInputField] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        id: 3,
        task: "test"
    })
    const showModal = () => {
        setVisible(true)
    };

    const addTodoItem = async () => {
        setData({
            task:inputField
        });
        console.log(data)
    };

    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, { task: changeInput });
        props.fetchData();
        setIsEdit(false);
    };

    const toggleEdit = () => {
        setChangeInput(props.todo.task);
        setIsEdit(true);
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Add your Todo List"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row justify="center">
                </Row>
                <Row justify="center">
                    <Col>
                        <Input value={inputField} onChange={(e) => setInputField(e.target.value)} />
                    </Col>
                    <Col>
                        <Button onClick={addTodoItem}>Add</Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default TestPage

import React, { useState } from 'react';
import { Button, Row, Col, Input, Modal, Typography, List } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons'
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

export default function Todo(props) {
    const [changeInput, setChangeInput] = useState(props.todo.task);
    const [changeDetail, setChangeDetail] = useState(props.todo.detail);
    const [visible, setVisible] = useState(false);

    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, { task: changeInput, detail: changeDetail });
        console.log(props.todo)
        props.fetchData();
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true)
    };


    /*let contents = (
        <Row style={{ width: '100%' }}>
            <Col span={20}>
                <Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} />
            </Col>
            <Col span={4}>
                <Button type="primary" onClick={() => updateTodoItem(props.todo.id)}>Done</Button>
            </Col>
        </Row>
    );*/

    return (
        <List.Item style={{textAlign:'left', wordWrap:'break-word'}}>
                <Col span={1}>
                    <CheckOutlined style={{color:"#52c41a"}} onClick={()=>props.delete(props.todo.id)} />
                </Col>
                <Col span={22}>
                    <List.Item.Meta
                        title={props.todo.task}
                        description={props.todo.detail}
                    />
                </Col>
                
                <Col span={1}>
                    <Modal
                        title="Add your Todo List"
                        visible={visible}
                        okText={"Submit"}
                        onOk={() => updateTodoItem(props.todo.id)}
                        onCancel={handleCancel}
                    >
                        <Row justify="center" style={{ margin: "5px" }}>
                            <Col span={3}><Text>Title</Text></Col>
                            <Col span={21}><Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} /></Col>
                        </Row>
                        <Row justify="center" style={{ margin: "5px" }}>
                            <Col span={3}>Detail</Col>
                            <Col span={21}><TextArea value={changeDetail} onChange={(e) => setChangeDetail(e.target.value)}></TextArea></Col>
                        </Row>

                    </Modal>
                    <Button icon={<EditOutlined />} onClick={showModal} />
                </Col>

        </List.Item>

    );
}

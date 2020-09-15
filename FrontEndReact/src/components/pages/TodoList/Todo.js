import React, { useState } from 'react';
import {
    Button,
    Row,
    Col,
    Input,
    Modal,
    Typography,
    List,
    message,
    Popconfirm,
    Tooltip
} from 'antd';
import { EditOutlined, CheckOutlined, BellOutlined } from '@ant-design/icons'
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

export default function Todo(props) {
    const [changeInput, setChangeInput] = useState(props.todo.task);
    const [changeDetail, setChangeDetail] = useState(props.todo.detail);
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState("")
    const [tipsTitle, setTipsTitle] = useState("This is important ?")

    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, { task: changeInput, detail: changeDetail });
        console.log(props.todo)
        props.fetchData();
        setVisible(false);
        message.success('success');
    };

    const setPriority = () => {
        console.log()
        if (color === "") {
            setColor("#f5222d");
            setTipsTitle("")
        } else {
            setColor("")
            setTipsTitle("This is important ?")
        }
    }

    return (
        <Row justify='center'>
            <Col span={23}>
                <List.Item
                    style={{ textAlign: 'left', wordWrap: 'break-all' }}
                    actions={[
                        <>
                            <Modal
                                title="Add your Todo List"
                                visible={visible}
                                okText={"Submit"}
                                onOk={() => updateTodoItem(props.todo.id)}
                                onCancel={() => setVisible(false)}
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
                            <Button icon={<EditOutlined />} size='small' onClick={() => setVisible(true)} />
                        </>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <>
                                <Popconfirm
                                    title="Already done? this task will be deleted"
                                    onConfirm={() => props.delete(props.todo.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >

                                    <CheckOutlined style={{ color: "#52c41a", cursor: 'pointer' }} /><br />
                                </Popconfirm>
                                <Tooltip title={tipsTitle}>
                                    <BellOutlined className="priority"
                                        onClick={setPriority}
                                        style={{ color: color, }}
                                    />
                                </Tooltip>
                            </>
                        }
                        title={props.todo.task}
                        description={props.todo.detail}

                    />
                </List.Item>
            </Col>
        </Row>

    );
}
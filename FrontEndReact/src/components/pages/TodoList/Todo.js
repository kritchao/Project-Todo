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
    const [showOption, setShowOption] = useState(false)
    const [priority, setPriority] = useState(props.todo.priority)

    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, { task: changeInput, detail: changeDetail });
        console.log(props.todo)
        props.fetchData();
        setVisible(false);
        message.success('success');
    };

    const changePriority = (id) => {
        axios.put(`/todo-list/${id}`, { priority: !priority })
        .then(setPriority(!priority))
        
    }

    const handleColor = () => {
        if (priority) {
            return {color: "#f5222d"};
        } else {
            return {color: "black"}
        }
    }

    let option = (<List.Item.Meta
        style={{cursor: 'pointer'}}
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
                <Tooltip mouseEnterDelay="0.75" title="important ?">
                    <BellOutlined className="priority"
                        onClick={()=>changePriority(props.todo.id)}
                        style={handleColor()}
                    />
                </Tooltip>
            </>
        }
        title={<Row onClick={()=>setVisible(true)}>{props.todo.task}</Row>}
        description={<Row onClick={()=>setVisible(true)}>{props.todo.detail}</Row>}
    />)

    return (
        <Row justify='center'>
            <Col span={23}>
                <List.Item
                    style={{ textAlign: 'left', wordWrap: 'break-all' }}
                    actions={[
                        <>
                            <Modal
                                title="Edit your Todo List"
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
                        </>
                    ]}
                >
                    {option}
                </List.Item>
            </Col>
        </Row>

    );
}
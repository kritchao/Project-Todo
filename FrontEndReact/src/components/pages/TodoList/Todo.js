import React, { useState } from 'react';
import {
    Row,
    Col,
    Input,
    Modal,
    Typography,
    List,
    message,
    Popconfirm,
    Tooltip,
    DatePicker
} from 'antd';
import { CheckOutlined, BellOutlined } from '@ant-design/icons'
import axios from 'axios';
import moment from 'moment';

const { Text } = Typography;
const { TextArea } = Input;

export default function Todo(props) {
    const [changeInput, setChangeInput] = useState(props.todo.task);
    const [changeDetail, setChangeDetail] = useState(props.todo.detail);
    const [visible, setVisible] = useState(false);
    const [priority, setPriority] = useState(props.todo.priority)
    const [changeDate, setChangeDate] = useState(props.todo.date)

    const date = new Date(changeDate);

    const updateTodoItem = async (id) => {
        await axios.put(`/todo-list/${id}`, { task: changeInput, detail: changeDetail, date: changeDate });
        console.log(props.todo)
        props.fetchData();
        setVisible(false);
        message.success('success');
    };

    const changePriority = (id) => {
        axios.put(`/todo-list/imp/${id}`, { priority: !priority })
            .then(setPriority(!priority))

    }

    const handleColor = () => {
        if (priority) {
            return { color: "#f5222d" };
        } else {
            return { color: "black" }
        }
    }

    const handleTime = () => {
        if (date <= moment()) {
            return "#f5222d"
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
                                title="Edit your Todo List"
                                visible={visible}
                                okText={"Submit"}
                                onOk={() => updateTodoItem(props.todo.id)}
                                onCancel={() => setVisible(false)}
                            >
                                <Row justify="center" style={{ margin: "5px" }}>
                                    <Col span={4}><Text>Title</Text></Col>
                                    <Col span={20}><Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} /></Col>
                                </Row>
                                <Row justify="center" style={{ margin: "5px" }}>
                                    <Col span={4}>Detail</Col>
                                    <Col span={20}><TextArea value={changeDetail} onChange={(e) => setChangeDetail(e.target.value)}></TextArea></Col>
                                </Row>
                                <Row>
                                    <Col span={4}>Date and Time</Col>
                                    <Col span={20}><DatePicker
                                        style={{ width: '80%', margin: "5px" }}

                                        format='MMMM Do YYYY, h:mm'
                                        disabledDate={props.disabledTime}
                                        showTime
                                        onChange={(e) => setChangeDate(e)} /></Col>
                                </Row>
                            </Modal>
                            <p style={{ color: handleTime() }}>{date.getHours()}:{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}  {date.toDateString()}</p>
                        </>
                    ]}
                >
                    <List.Item.Meta
                        style={{ cursor: 'pointer' }}
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
                                        onClick={() => changePriority(props.todo.id)}
                                        style={handleColor()}
                                    />
                                </Tooltip>
                            </>
                        }
                        title={<p onClick={() => setVisible(true)}><strong>{props.todo.task}</strong></p>}
                        description={<p onClick={() => setVisible(true)}>{props.todo.detail}</p>}
                    />
                </List.Item>
            </Col>
        </Row>

    );
}
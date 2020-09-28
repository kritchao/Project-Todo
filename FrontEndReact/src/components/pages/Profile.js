import React, { useState, useEffect } from 'react';
import { Col, notification, Modal, Button, Form, Input } from 'antd';
import axios from 'axios'

export default function Profile(props) {
    const [profile, setProfile] = useState([])
    const [visible, setVisible] = useState(false);
    const [job, setJob] = useState([])

    const fetchData = async () => {
        const httpResponse = await axios.get("/users");
        setProfile(httpResponse.data);
    };
    const fetchJob = async () => {
        const job = await axios.get("/todo-list");
        setJob(job.data.length)
    }

    useEffect(() => {
        fetchData();
        fetchJob();
    }, [])

    const showModal = () => {
        setVisible(true)
    };
    const handleCancel = () => {
        setVisible(false)
    }

    const changePassword = (values) => {
        const body = {
            username: profile.username,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }
        axios.put('/users/changePassword', body)
            .then(res => {
                notification.info({ message: res.data.message });
                setVisible(false);
            })
            .catch(err => {
                notification.error({ message: err.response.data.message })
            });
    }

    return (
        <Col justify="center" style={{height:"90vh"}}>
            <div>
                <h2>
                    Profile
                </h2>
                <p>
                    <strong>Email: </strong> {profile.username}
                    <br />
                    <strong>name: </strong>  {profile.name}
                    <br />
                    <strong>Still got work to do: </strong> {job}
                </p>

                <Modal
                    title="Change Your Password"
                    visible={visible}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Form
                        layout='vertical'
                        onFinish={changePassword}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            name="oldPassword"
                            label="Your Old Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            label="Your New Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            hasFeedback
                            dependencies={["newPassword"]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Confirm Password is incorrect!")
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type='primary' htmlType="submit" >Submit</Button>
                    </Form>

                </Modal>
                <Button onClick={showModal} type='primary'>Change your Password</Button>
            </div>
        </Col>
    );
}

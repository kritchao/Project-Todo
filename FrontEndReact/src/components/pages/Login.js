import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification, Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../config/axios'
import localStorageServices from '../../services/localStorageService'
import { Link } from 'react-router-dom';
import Logo from './Logo.png'

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};

export default function Login(props) {

    const onFinish = values => {
        const body = {
            username: values.username,
            password: values.password
        }
        axios.post("/users/login", body)
            .then(res => {
                localStorageServices.setToken(res.data.token);
                props.setRole("user")
            })
            .catch(err => {
                notification.error({
                    message: err.response.data.message
                });
            });
    }
    return (
        <Row justify="center">
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>

                <div className="Form">
                    <Row justify="center">
                        <Image width="50%" src={Logo} />
                    </Row>
                    <Row justify="center">
                        <Title level={3} className="Title">
                            Schedule your Day
                            </Title>
                    </Row>

                    <Divider className="Divider" />

                    <Form className="App"  {...layout}  onFinish={onFinish} >
                            <Title level={4} className="Title">
                                Login
                            </Title>

                        <Form.Item label="Email"  name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input.Password />
                        </Form.Item>

                            <Button className="Button" style={{width:"50%"}} type="primary" htmlType="submit">
                                Login
                            </Button>
                        <Link to="/register">
                            <Button className="Button" type="link" htmlType="submit">
                                Don't have account ? just Register
                            </Button>
                        </Link>

                    </Form>

                </div>
            </Col>
        </Row>
    );
}

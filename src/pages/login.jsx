import { ArrowRightOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";


const LoginPage = () => {

    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log("check value:", values)
    }

    return (
        <Row justify={'center'} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={6}>
                <fieldset
                    style={{
                        padding: '15px',
                        margin: '5px',
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}
                >
                    <legend>Login</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Wrong email format!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                },

                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" htmlType="submit">Login</Button>
                            <Link to={'/'}>Go to homepage <ArrowRightOutlined /></Link>
                        </div>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>Do not have an account? <Link to={'/register'} >Register here</Link></div>
                    </Form>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;
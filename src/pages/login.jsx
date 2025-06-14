import { ArrowRightOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../service/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../component/auth.context";


const LoginPage = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Login successfully")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate('/')
        }
        else {
            message.error(JSON.stringify(res.message))
            // notification.error({
            //     message: 'Login failed',
            //     description: JSON.stringify(res.message)
            // })
        }
        setLoading(false)
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
                            <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
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
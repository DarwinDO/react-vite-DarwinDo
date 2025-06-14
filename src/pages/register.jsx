import { Button, Checkbox, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../service/api.service";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        // console.log("check value:", values)
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Register user successfully."
            })
        }
        else {
            notification.error({
                message: "Register User Error",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (

        <Form
            layout="vertical"
            form={form}
            // name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ margin: '30px' }}

        // // onFinishFailed={onFinishFailed}
        // autoComplete="off"
        >
            <h3 style={{ textAlign: 'center' }}>Register Accout</h3>
            {/* <div
                style={{
                    // display: 'flex', gap:'20px',  flexDirection: 'column',
                    margin: '50px'
                }}
            > */}
            <Row justify={"center"}>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Full name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify='center'>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify='center'>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Pass word!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify='center'>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                //      message: 'Please input your Phone!'                            
                                pattern: new RegExp(/^\d+$/),
                                message: "Wrong format!"
                                // type: 'regexp',  //dont need to use in rules regx nowadays
                            }
                        ]}

                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Row justify='center'>
                <Col xs={24} sm={12} md={6}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary"
                            htmlType="submit" //type:'Submit': C1
                        // onClick={() => { form.submit() }} //type: 'Submit': C2
                        >
                            Register
                        </Button>
                        <Link to={'/'}>Go to homepage <ArrowRightOutlined /></Link>
                    </div>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>Already have an account? <Link to={'/login'}>Go to Login</Link></div>
                </Col>


            </Row>

            {/* </div> */}
        </Form>
    )
}

export default RegisterPage;
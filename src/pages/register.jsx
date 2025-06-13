import { Button, Checkbox, Form, Input } from "antd";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) =>{
        console.log("check value:", values)
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
            // // onFinishFailed={onFinishFailed}
            // autoComplete="off"
        >
            <div 
            style={{ 
            // display: 'flex', gap:'20px',  flexDirection: 'column',
             margin: '50px'
             }}
            >  
                <Form.Item
                    label="Full name"
                    name="fullName"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                // rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                <Form.Item label={null}>
                    <Button type="primary" 
                    // htmlType="submit" //typeSubmit: C1
                    onClick={()=>{form.submit()}} //typeSubmit: C2
                    >
                        Register
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default RegisterPage;
import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }

    const URL_BACKEND = "http://localhost:8080/api/v1/user"

    const handleClick = () => {
        axios.post(URL_BACKEND, data)
        console.log("check infor:", {
            fullName,
            email,
            password,
            phone
        })
    }



    return (
        <div className="user-form" style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <div>
                    <span >Full name</span>
                    <Input
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={handleClick}
                    >Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;
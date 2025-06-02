import { Button, Input } from "antd";
import { useState } from "react";

const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClick = () => {
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
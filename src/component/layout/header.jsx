import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { AuthContext } from "../auth.context";

const Header = () => {

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">User</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={'/login'}>Login</Link>,
                    key: 'login'
                },
                {
                    label: 'Logout',
                    key: 'logout'
                }
            ]

        }
    ];

    const [current, setCurrent] = useState('');

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    }

    const { user } = useContext(AuthContext)
    console.log("check data", user)

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default Header;



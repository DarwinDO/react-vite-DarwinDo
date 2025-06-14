import { Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { AuthContext } from "../auth.context";
import { logoutAPI } from "../../service/api.service";

const Header = () => {

    const [current, setCurrent] = useState('');
    const navigate = useNavigate()

    const { user, setUser } = useContext(AuthContext)
    // console.log("check data", user)

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    }

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            })
            localStorage.removeItem("access_token")
            message.success("Logout successfully")
            navigate("/")
        }
    }



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
        ...(!user.id ?
            [{
                label: <Link to="/login">Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            }]
            : []),

        ...(user.id ?
            [{
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={handleLogout}>Logout</span>,
                        key: 'logout',
                        icon: <LogoutOutlined />,
                    }
                ]
            }]
            : []),
    ];
    // Biểu thức ...() trong đoạn code trên là cú pháp "spread operator" trong JavaScript (ES6).
    // Cụ thể, ...array sẽ "trải phẳng" (spread) các phần tử của mảng array vào vị trí hiện tại.
    // Ở đây, ...(!user.id ? [ ... ] : []) nghĩa là:
    // - Nếu user.id chưa có (chưa đăng nhập), thì thêm phần tử Login vào mảng items.
    // - Nếu user.id đã có (đã đăng nhập), thì thêm phần tử Welcome + Logout vào mảng items.
    // Nói cách khác, ...() giúp chèn động các phần tử vào mảng items dựa trên điều kiện.
    // Không có cách ghi khác tương đương khi dùng spread operator trong mảng.
    // Bởi vì ... chỉ hoạt động với mảng (array), truyền (spread) các items từ mảng con và mảng cha, nên bắt buộc phải dùng ... (điều kiện ? [obj] : []).
    // Nếu bạn viết ...(user.id ? obj : obj) hoặc ...(user.id ? {} : {}), thì sẽ bị lỗi vì {} không phải là mảng.
    // Tóm lại: Muốn thêm động phần tử vào mảng với spread operator, chỉ có thể dùng ... (điều kiện ? [obj] : []).


    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default Header;



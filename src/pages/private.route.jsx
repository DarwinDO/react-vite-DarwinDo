import { useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { AuthContext } from "../component/auth.context"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {

    const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    // return (
    //     <Navigate to="/login" replace />
    // )

    return (
        <Result
            status="403"
            title="Unauthorized!"
            subTitle="You need to login to access this page"
        // Đoạn code extra này sẽ thêm một nút "Login" vào giao diện Result của Ant Design.
        // Khi người dùng chưa đăng nhập mà truy cập vào trang cần quyền riêng tư, họ sẽ thấy nút này.
        // Nút "Login" là một Button bọc bên trong là một Link.
        // Link này sẽ chuyển hướng người dùng đến trang /login, đồng thời truyền kèm tham số redirect trên URL.
        // Tham số redirect có giá trị là đường dẫn hiện tại (window.location.pathname), được mã hóa bằng encodeURIComponent.
        // Mục đích là sau khi đăng nhập thành công, hệ thống có thể chuyển người dùng về lại trang mà họ định truy cập ban đầu.
        // Cụ thể:
        // extra={
        //     <Button type="primary">
        //         <Link to={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}>Login</Link>
        //     </Button>
        // }
        />
    )
}

export default PrivateRoute
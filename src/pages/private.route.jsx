import { useContext } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../component/auth.context"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {

    const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

    const navigate = useNavigate()


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
            extra={
                <Button type="primary">
                    <Link to={'/login'}>Login</Link>
                </Button>
            }
        />
    )
}

export default PrivateRoute
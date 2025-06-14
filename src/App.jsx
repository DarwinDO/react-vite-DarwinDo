
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./component/auth.context";
import { getUserAPI } from "./service/api.service";
import { Spin } from "antd";


const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

  useEffect(() => {
    fetchUserInfor()
  }, [])

  const delay = (milliseconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, milliseconds)
    })
  }

  const fetchUserInfor = async () => {
    const res = await getUserAPI()
    // await delay(3000)
    if (res.data) {
      setUser(res.data.user)
    }
    setIsAppLoading(false)
  }
  return (
    <>
      {isAppLoading ?
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Spin size="large" />
        </div>
        : <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App

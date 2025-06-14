
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./component/auth.context";
import { getUserAPI } from "./service/api.service";


const App = () => {

  const { setUser } = useContext(AuthContext)

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
    await delay(3000)
    if (res.data) {
      setUser(res.data.user)
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <h1>Login Page</h1>,
  },
  {
    path: "/register",
    element: <h1>Register Page</h1>,
  },
  {
    path: "/users",
    element: <h1>User Page</h1>,
  },
  {
    path: "/products",
    element: <h1>Product Page</h1>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

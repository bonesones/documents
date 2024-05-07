import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Document from './Document.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { Provider, useSelector } from "react-redux"
import store from './store/index.js'
import Protected from './components/Protected.jsx'
import Login from './pages/logIn.jsx'
import Register from './pages/register.jsx'


export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <Protected> 
              <Home />
            </Protected>
    }, 
    {
        path: "/documents/:documentId",
        element: 
            <Protected>
                <Document />
            </Protected>
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

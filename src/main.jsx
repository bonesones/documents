import React from 'react'
import ReactDOM from 'react-dom/client'
import Document from './Document.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { Provider } from "react-redux"
import store from './store/index.js'
import Protected from './components/Protected.jsx'
import Login from './pages/logIn.jsx'
import Register from './pages/register.jsx'
import ErrorPage from './pages/errorPage.jsx'


export const router = createBrowserRouter([
    {
        path: "*",
        element: 
            <h1 className='error-404'>
                Ошибка 404<br />
                Страница не существует
            </h1>
    },
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
    },
    {
        path: "error",
        element: <ErrorPage />
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

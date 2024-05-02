import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Document from './Document.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { Provider } from "react-redux"
import store from './store/index.js'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }, 
    {
        path: "documents/:documentId",
        element: <Document />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

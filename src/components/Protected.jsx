import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading"
import Loading from "../pages/Loading";
import { useRef } from "react";
import ErrorPage from "../pages/errorPage";
import { server } from "../config";

const Protected = function({ children }) {
    const navigate = useNavigate()
    const [renderResult, setRendreResult] = useState(<Loading />)

    console.log('renders')

    async function checkToken() {

        try {
            await axios.get(`${server}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            
            setRendreResult(children)
        } catch(e) {
            console.log(e)
            if(e.message === "Network Error") {
                navigate('/error')
            } else {
                navigate('/login')
            }
        }
    }
    checkToken()


    return renderResult
}

export default Protected
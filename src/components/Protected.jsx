import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Protected = function({ children }) {

    const [resultRender, setResultRender] = useState(children)
    
    useEffect(() => {
        const checkAuthorized = async function () {
            try {
                const response = await axios.get("http://localhost:5000/auth/verify", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        Username: localStorage.getItem('username')
                    }
                })
                console.log('worked')
                setResultRender(children)
            } catch(e) {
                console.log(e)    
                setResultRender(() => <Navigate to="/login" replace />)
            }
        }

        checkAuthorized()
    })

    return resultRender
}

export default Protected
import { Link } from "react-router-dom"
import { useState } from "react";
import { EditorState } from "draft-js"
import SavedDoc from "./components/SavedDoc";
import { useSelector, useDispatch } from "react-redux"
import { addDocument } from "./store/documentSlice"
import { useEffect } from "react";
import axios from "axios"

export default function Home() {

    const documents = useSelector(state => state.documents.documents)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch() 

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const addFile = () => dispatch(addDocument())

    useEffect(() => {

        
        if(documents.length === 0) {     
            addFile();
        }
    }, [])

    const loginUser = function(e) {
        e.preventDefault();
        try {
            axios.post('http://localhost:5000/auth/login', {
                username: login,
                password: password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
            }).catch(e => {
                if(e.response.status === 403) {
                    alert('Неверный логин или пароль')
                }
            })
        } catch(e) {
            console.log(e)
        }
    }

    const handleChangeLogin = function(e) {
        setLogin(e.target.value)
    }
    const handleChangePassword = function(e) {
        setPassword(e.target.value)
    }

    const getUsers = function() {
        axios.get('http://localhost:5000/auth/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(e => {
            console.log(e.data)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="main">
            <form type="post" onSubmit={(e) => loginUser(e)}>
                <input type="text" name="username" placeholder="username" onChange={(e) => handleChangeLogin(e)} />
                <input type="password" name="password" placeholder="password" onChange={(e) => handleChangePassword(e)} />
                <input type="submit" value={"submit"}/>
            </form>
            <button type="button" onClick={getUsers}>Get users</button>
            <h1 className="app-header">Текстовый редактор</h1>
            <div className="main-block">
                <div className="create-doc">
                    <input type='submit' className="create-doc__btn" onClick={() => addFile()} value="+" />
                    <span className="create-doc__description">Создать новый документ</span>
                </div>
                <div className="docs_saved">
                    {
                        documents?.map(doc => {
                            return <SavedDoc key={doc.id} id={doc.id} title={doc.title} />
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}
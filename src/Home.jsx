import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { EditorState } from "draft-js"
import SavedDoc from "./components/SavedDoc";
import { useSelector, useDispatch } from "react-redux"
import { addDocument, initDocuments, saveDocument } from "./store/documentSlice"
import { useEffect } from "react";
import axios from "axios"
import store from "./store/index"
import { router } from "./main"
import { server } from "./config";

export const updateDocuments = async function() {
    try {
        const response = await axios.get(`${server}/auth/getDocuments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.data;
        localStorage.setItem('documents', JSON.stringify(data.documents))
        store.dispatch(saveDocument(data.documents))
    } catch(e) {
        console.log(e)
        if(e.response.status === 403) {
            router.navigate('/')
        }
    }
}


export default function Home() {

    useEffect(() => {
        const htmlTag = document.querySelector('html')
        if(!htmlTag.classList.contains('home')) {
            htmlTag.classList.add('home');
            htmlTag.classList.remove('document')
        }
        dispatch(initDocuments())
    }, [localStorage.getItem('document')])


    const user = useSelector(state => state.user.user)

    const documents = useSelector(state => state.documents.documents)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const addFile = async () => {
        try {
            const result = await axios.post(`${server}/auth/addDocument`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            await updateDocuments()
        } catch(e) {
            console.log(e)
        }
    }

    const handleLogout = async function() {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className="main">
            <div className="app-header">
                <h1 className="app">Текстовый редактор</h1>
                <div className="app__user-info">
                    <span>Пользователь: {localStorage.getItem('username')}</span>
                    <button className="app__logout-btn" onClick={handleLogout} type="button">Выйти</button>
                </div>
            </div>
            <div className="main-block">
                <div className="create-doc">
                    <input type='submit' className="create-doc__btn" onClick={() => addFile()} value="+" />
                    <span className="create-doc__description">Создать пустой документ</span>
                </div>
                <div className="docs_saved">
                    <h2 className="docs_saved__title">Документы</h2>
                    <div className="docs">
                    {
                        documents?.map(doc => {
                            let document = JSON.parse(doc);
                            return <SavedDoc key={document.id} id={document.id} title={document.title} />
                        })       
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
import { Link } from "react-router-dom"
import { useState } from "react";
import { EditorState } from "draft-js"
import SavedDoc from "./components/SavedDoc";
import { useSelector, useDispatch } from "react-redux"
import { addDocument, initDocuments, saveDocument } from "./store/documentSlice"
import { useEffect } from "react";
import axios from "axios"
import store from "./store/index"

export const updateDocuments = async function() {
    try {
        const response = await axios.get('http://localhost:5000/auth/getDocuments', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Username: localStorage.getItem('username')
            },
        });
        const data = await response.data;
        localStorage.setItem('documents', JSON.stringify(data.documents))
        console.log('updated')
        store.dispatch(saveDocument(data.documents))
    } catch(e) {
        console.log(e)
    }
}


export default function Home() {

    const user = useSelector(state => state.user.user)


    const documents = useSelector(state => state.documents.documents)


    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initDocuments())
    }, [localStorage.getItem('document')])

    useEffect(() => {
        const htmlTag = document.querySelector('html')
        if(!htmlTag.classList.contains('home')) {
            htmlTag.classList.add('home');
            htmlTag.classList.remove('document')
        }
    }, [])

    const addFile = async () => {
        try {
            const result = await axios.post("http://localhost:5000/auth/addDocument", {
                username: localStorage.getItem('username')
            })

            updateDocuments()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="main">
            <h1 className="app-header">Текстовый редактор</h1>
            <div className="main-block">
                <div className="create-doc">
                    <input type='submit' className="create-doc__btn" onClick={() => addFile()} value="+" />
                    <span className="create-doc__description">Создать новый документ</span>
                </div>
                <div className="docs_saved">
                    {
                        
                        documents?.map(doc => {
                            let document = JSON.parse(doc);
                            return <SavedDoc key={document.id} id={document.id} title={document.title} />
                        })
                        
                    }
                </div>
            </div>
        </div>
    )
}
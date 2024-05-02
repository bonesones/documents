import { Link } from "react-router-dom"
import { useState } from "react";
import { EditorState } from "draft-js"
import SavedDoc from "./components/SavedDoc";
import { useSelector, useDispatch } from "react-redux"
import { addDocument } from "./store/documentSlice"
import { useEffect } from "react";

export default function Home() {

    const documents = useSelector(state => state.documents.documents)
    const dispatch = useDispatch() 

    const addFile = () => dispatch(addDocument())

    useEffect(() => {
        if(documents.length === 0) {     
            addFile()
        }
    }, [])

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
                            return <SavedDoc key={doc.id} id={doc.id} title={doc.title} />
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}
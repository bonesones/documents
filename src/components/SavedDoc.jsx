import { Link } from "react-router-dom"
import { changeDocumentTitle, removeDocument } from "../store/documentSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useRef } from "react"
import axios from "axios"
import { updateDocuments } from "../Home"
import { server } from "../config"
import { useCallback } from "react"
import { useEffect } from "react"



export default function SavedDoc({ title, id, saveDocument }) {
    
    const submitRef = useRef(null)

    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [inputValue, setInputValue] = useState(title)

    const handleRemove = async () => {
        try {
            const response = await axios.post(`${server}/auth/removeDocument`, {
                username: localStorage.getItem('username'),
                id: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            await updateDocuments(saveDocument)
        } catch(e) {

        }
    }

    const handleEdit = function() {
        setIsEditingTitle(state => !state)
    }

    const handleFocusOut = function(e) {
        if(e.relatedTarget !== submitRef.current) {
            handleEdit();
            setInputValue(title)
        }
    }

    const handleSaveTitle = async function() {
        try {
            const response = await axios.post('http://localhost:5000/auth/changeTitle',{
                id: id,
                newTitle: inputValue,
                username: localStorage.getItem('username')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            await updateDocuments(saveDocument)
            handleEdit()
        } catch(e) {
            console.log(e)
        }
    }

    const handleEnterUp = async (e) => {
        if(e.key === 'Enter') {
            await handleSaveTitle()
        }
    }

    
 
    const handleChangeInput = function(e) {
        setInputValue(e.target.value)
    }

    return(
        <div className="document-card-wrapper">
            {
                isEditingTitle ? 
                    <div className="docs-element">
                        <img src="/file-image.svg" width={35} />
                        <input className="docs-element__title docs-element__title_edit" 
                               type="text" 
                               value={inputValue}
                               onChange={(e) => handleChangeInput(e)} 
                               onBlur={(e) => handleFocusOut(e)}
                               onKeyUp={(e) => handleEnterUp(e)}
                               autoFocus
                                /> 
                    </div>
                :
                    <Link to={'documents/' + id} className="docs-element">
                        <img src="/file-image.svg" width={35} />
                        <p className="docs-element__title">{inputValue}</p> 
                    </Link>
            }
            {
                isEditingTitle ? 
                <svg onClick={handleSaveTitle} tabIndex={-1} ref={submitRef} className="submit-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="30px" height="30px">
                    <path d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"/>
                </svg>
                :
                <svg onClick={handleEdit} className="edit-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    
                    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/>
                    <title>Изменить название</title>
                </svg>
            }
            <svg onClick={() => handleRemove(id)} className="remove-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    
                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
                <title>Удалить</title>
            </svg>
        </div>
    )
}
import { convertToRaw, convertFromRaw, EditorState } from "draft-js"
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg"
import toolbarOptions from "./tools/toolbar";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { editDocument } from "./store/documentSlice";
import { asBlob } from "html-docx-js-typescript"
import { saveAs } from 'file-saver'
import { stateToHTML } from "draft-js-export-html"
import axios from "axios";
import { server } from "./config";
import store from "./store/index";
import { updateDocuments } from "./Home";
import { useEffect } from "react";
import { useRef } from "react";
import imageIcon from "./assets/image.svg"



function Document() {
  const documents = useSelector(state => state.documents.documents)
  const parsedDocuments = documents.map(doc => JSON.parse(doc))
  const { documentId } = useParams();
  const [isEdited, setEdited] = useState(false)
  const [askForSave, setAskForSave] = useState(false)
  const navigate = useNavigate()

  const document = parsedDocuments.find(({ id }) => id === documentId)
  useEffect(() => {
    window.document.querySelector('html').classList.remove('home')
    window.document.querySelector('html').classList.add('document')
  }, [])

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(convertFromRaw(document.document))
  )

  const dispatch = useDispatch();

  const handleSave = async function() {
    try {
      await axios.post(`${server}/auth/saveDocument`, {
        document: convertToRaw(editorState.getCurrentContent()),
        username: localStorage.getItem('username'),
        id: documentId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setEdited(false)
      await updateDocuments()
    } catch(e) {
      console.log(e)
    }

  }

  const handleDownload = async function() {
    const stateDataToHtml = "<!DOCTYPE html> <head><meta http-equiv='Content-Type' content='text/html'; charset='UTF-8'></head>" + stateToHTML(editorState.getCurrentContent())
    const firstBuffer = await asBlob(stateDataToHtml);

    saveAs(firstBuffer, `${document.title}.docx`)
  }

  const cutDocumentTitle = function() {
    if(!document?.title){
      return
    } else if (document.title.length < 60) {
      return document.title
    }
    return document.title.substr(0, 60) + "..."
  }

  const handleNavigateToMain = function(e) {
    if(isEdited) {
      e.preventDefault();
      setAskForSave(true);
    }
  }



  const SecondPanel = function() {
   return (
    <div className="top-panel" onMouseDown={(e) => e.preventDefault()}>
      <div className="top-panel-actions">
        <Link className="top-panel__main-page" to={"/"} onClick={e => handleNavigateToMain(e)}>На главную</Link>
        <button className="top-panel__save-btn" type="button" onClick={() => handleSave()}>
          Сохранить
        </button>
        <button className="top-panel__download-btn" type="button" onClick={() => handleDownload()}>
          Скачать
        </button>
      </div>
      <p className="document__title">{isEdited ? cutDocumentTitle() + "*" : cutDocumentTitle()}</p>
    </div>
   )
  }

  const exitWithSave = async function() {
    await handleSave();
    navigate('/')
  }

  const ModalAsk = function() {
    return (
      <>
        <div className="modal-background"></div>
        <div className='ask-modal' onMouseDown={(e) => e.preventDefault()}>
          <p className='ask-modal__title'>У вас есть несохраненные данные</p>
          <div className="ask-modal-btn-block">
            <button className="ask-modal__exit_save" onClick={exitWithSave} type="button">Сохранить и выйти</button>
            <Link to="/" className="ask-modal__exit" >Выйти без сохранения</Link>
            <button className="ask-modal__cancel" onClick={() => setAskForSave(false)} type="button">Отмена</button>
          </div>
        </div>
      </>
    )
  }

  return (
  <>
    {askForSave && <ModalAsk />}
    <SecondPanel />
      <Editor
          editorState={editorState}
          onContentStateChange={(e) => {
            if(JSON.stringify(e) !== JSON.stringify(document.document)) {
              setEdited(true)
            } else {
              setEdited(false)
            }
          }}
          onEditorStateChange={(state) => {
            setEditorState(state)}
          }
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            ...toolbarOptions,
            image: {
              urlEnabled: false,
              icon: imageIcon,
              defaultSize: {
                height: '200px',
                width: '400px'
              },
              uploadCallback: (file) => {
                return new Promise(
                  (resolve, reject) => {
                      const xhr = new XMLHttpRequest();
                      xhr.open('POST', 'https://api.imgur.com/3/image');
                      xhr.setRequestHeader('Authorization', `Client-ID 4d2eee0752e1948`)
                      const data = new FormData();
                      data.append('image', file);
                      xhr.send(data);
                      xhr.addEventListener('load', () => {
                          const response = JSON.parse(xhr.responseText);
                          console.log(response);
                          resolve(response);
                      })
                      xhr.addEventListener('error', () => {
                          const error = JSON.parse(xhr.responseText);
                          console.log(error);
                          reject(error)
                      })
                  }
              );
              },
              alt: { present: true, mandatory: false }
            }}
        }
        />
    
  </>

  )
}

export default Document

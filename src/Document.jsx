import { convertToRaw, convertFromRaw, EditorState } from "draft-js"
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg"
import toolbarOptions from "./tools/toolbar";
import { Link, useParams } from "react-router-dom"
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



function Document() {
  const documents = useSelector(state => state.documents.documents)
  const parsedDocuments = documents.map(doc => JSON.parse(doc))
  const { documentId } = useParams();
  const editorRef = useRef(null)
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
    console.log('worked!')

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
    } catch(e) {
      console.log(e)
    }

    await updateDocuments()
  }

  const handleDownload = async function(data) {
    const stateDataToHtml = "<!DOCTYPE html> <head><meta http-equiv='Content-Type' content='text/html'; charset='UTF-8'></head>" + stateToHTML(data.getCurrentContent())
    console.log(stateDataToHtml)
    const firstBuffer = await asBlob(stateDataToHtml, {
    })

    console.log(firstBuffer)
    
    saveAs(firstBuffer, "test.docx")
  }



  const SecondPanel = function() {
   return (
    <div>
      <button type="button" onClick={() => handleSave()}>
        Сохранить
      </button>
      <button type="button" onClick={() => handleDownload(editorState)}>
        Скачать
      </button>
      <Link to={"/"}>Назад</Link>
    </div>
   )
  }

  return (
  <>
    <Editor
        editorState={editorState}
        ref={editorRef}
        onEditorStateChange={(state) => setEditorState(state)}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={
          toolbarOptions
        } />
  </>

  )
}

export default Document

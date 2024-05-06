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

function Document() {
  const documents = useSelector(state => state.documents.documents)
  const parsedDocuments = documents.map(doc => JSON.parse(doc))
  const { documentId } = useParams();
  const document = parsedDocuments.find(({ id }) => id === documentId)

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(convertFromRaw(document.document))
  )

  const dispatch = useDispatch();

  const handleSave = async function() {
    await axios.post(`${server}/auth/saveDocument`, {
      document: convertToRaw(editorState.getCurrentContent()),
      username: localStorage.getItem('username'),
      id: documentId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  const handleDownload = async function(data) {
    const stateDataToHtml = stateToHTML(data.getCurrentContent())
    console.log(stateDataToHtml)
    const fileBuffer = await asBlob(stateDataToHtml);
    saveAs(fileBuffer, "test.docx")
  }

  return (
  <>
    <button type="button" onClick={() => handleSave(editorState, documentId)}>
      Сохранить
    </button>
    <button type="button" onClick={() => handleDownload(editorState)}>
      Скачать
    </button>
    <Link to={"/"}>Назад</Link>
    <Editor
        editorState={editorState}
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

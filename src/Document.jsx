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

function Document() {
  const documents = useSelector(state => state.documents.documents)
  const { documentId } = useParams();
  const document = documents.find(({ id }) => id === Number(documentId))

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(convertFromRaw(document.data))
  )

  const dispatch = useDispatch();

  const handleSave = function(data, id) {
    dispatch(editDocument({ id: Number(id), data: convertToRaw(data.getCurrentContent()) }))
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

import { EditorState } from "draft-js"
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg"
import toolbarOptions from "./tools/toolbar";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  return (
    <div className="App">
      <header className="App-header">
        Редактор текстовых документов
      </header>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={
          toolbarOptions
        }
        
      />
    </div>
  )
}

export default App

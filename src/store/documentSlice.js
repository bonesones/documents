import { createSlice, current } from "@reduxjs/toolkit"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
//import { EditorState } from "react-draft-wysiwyg";


const findDocument = function(array, value) {
    return array.find(document => document.id = value)
}


const documentSlice = createSlice({
    name: 'documents',
    initialState: {
        documents: localStorage.getItem('documents') ? JSON.parse(localStorage.getItem('documents')) : []
    },
    reducers: {
        addDocument(state, action) {
            const editorState = EditorState.createEmpty();
            const rawState = convertToRaw(editorState.getCurrentContent());

            state.documents.push({
                id: state.documents.length + 1,
                title: "Новый текстовый документ",
                data: rawState
            })
        },
        removeDocument(state, action) {
            const document = findDocument(state.documents, action.payload)
            if(document) {
                const newDocuments = state.documents.filter(doc => doc !== document)

                state.documents = newDocuments
            }
        },
        editDocument(state, action) {
            const document = findDocument(state.documents, action.payload.id)
            if(document) {
                document.data = action.payload.data;
            }
        },
        changeDocumentTitle(state, action) {
            const document = findDocument(state.documents, action.payload.id)
            if(document && document.title !== action.payload.title) {
                document.title = action.payload.title
            }
        }

        
    }
})

export const { addDocument, removeDocument, editDocument, changeDocumentTitle } = documentSlice.actions

export default documentSlice.reducer
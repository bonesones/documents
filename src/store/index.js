import { configureStore } from "@reduxjs/toolkit"
import documentReducer from "./documentSlice"

export default configureStore({
    reducer: {
        documents: documentReducer
    }
})
import { configureStore } from "@reduxjs/toolkit"
import documentReducer from "./documentSlice"
import userReducer from "./userSlice"
import { useReducer } from "react"

export default configureStore({
    reducer: {
        documents: documentReducer,
        user: userReducer
    }
})
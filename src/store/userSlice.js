import { createSlice, current } from "@reduxjs/toolkit"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import axios from "axios"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            username: "",
            is_auth: false,
        }
    },
    reducers: {
        loginUser(username, password) {
             console.log('hello')
        }
    }
})

export const { loginUser } = userSlice.actions

export default userSlice.reducer
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import store from "./index"
import { initDocuments } from "./documentSlice"
import { server } from "../config"

export const fetchUser = createAsyncThunk(
    'user/fetchByUsername',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${server}/auth/login`, {
                username: data.username,
                password: data.password
            });
            const jsonData = response;
            return jsonData.data
        } catch(e) {
            console.log(e)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        error: null,
        status: null,
        user: {
            username: "",
            is_auth: false,
            documents: []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error
                state.status = "rejected"
            })
            .addCase(fetchUser.pending, (state) => {
                state.error = null
                state.status = "pending"
                console.log(state.status)
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { token, authorized, username, documents } = action.payload;
                state.error = null;
                state.status = "fulfilled";
                console.log(state.status)
                
                localStorage.setItem('token', token);
                localStorage.setItem('is_authorized', authorized)
                localStorage.setItem('documents', JSON.stringify(documents))
                localStorage.setItem('username', username)
                
                state.user = {
                    username,
                    is_auth: authorized,
                    documents: documents
                }
                
            })
    }
})

export default userSlice.reducer
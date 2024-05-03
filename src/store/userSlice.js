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
        getUserData(state, action) {
            return {
                user: {
                    username: action.payload.username,
                    is_auth: true
                }
            }
        }
    }
})

export const { getUserData } = userSlice.actions

export default userSlice.reducer
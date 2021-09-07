import { authReducer } from "auth"
import { postsReducer } from "post"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
    postsReducer,
    authReducer
})
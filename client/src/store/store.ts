import { combineReducers } from "redux"
import { postsReducer, authReducer } from "./reducers"

export const rootReducer = combineReducers({
    postsReducer,
    authReducer
})
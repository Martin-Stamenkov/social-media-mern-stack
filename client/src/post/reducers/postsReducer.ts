import { IPost } from "post"
import {
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    UPDATE_POST_SUCCESS
} from "../types"


const initialState = {
    posts: [] || null,
    loading: false,
    error: "",
    postLoading: false
}

export const postsReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_ALL_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case FETCH_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_POST_REQUEST:
            return {
                ...state,
                postLoading: true
            }
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                postLoading: false,
            }
        case CREATE_POST_FAIL:
            return {
                ...state,
                postLoading: false,
                error: action.payload
            }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map((post: IPost) => post._id === action.payload._id ? action.payload : post)
            }
        case "DELETE":
            return {
                ...state,
                posts: state.posts.filter((post: IPost) => post._id !== action.payload)
            }
        default:
            return state;
    }
}
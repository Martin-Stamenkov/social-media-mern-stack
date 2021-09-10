import { IPost } from "post"
import { Storage } from "storage"
import { userData } from "utils"
import {
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    UPDATE_POST_SUCCESS,
    CLEAR_USER_POSTS,
} from "../types"


const initialState = {
    posts: [] || null,
    loading: false,
    error: "",
    postLoading: false,
    userPosts: []
}

export const postsReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_ALL_SUCCESS:
            console.log(userData?.result?._id, userData?.result?.googleId)
            return {
                ...state,
                posts: action.payload,
                userPosts: action?.payload.filter((post: IPost) => post.creatorId === (JSON.parse(Storage.getItem("profile") || "null")?.result?._id
                    ? JSON.parse(Storage.getItem("profile") || "null")?.result?._id : JSON.parse(Storage.getItem("profile") || "null")?.result?.googleId)),
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
                userPosts: [...state.userPosts, action.payload],
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
                posts: state.posts.map((post: IPost) => post._id === action.payload._id ? action.payload : post),
                userPosts: state.userPosts.map((post: IPost) => post._id === action.payload._id ? action.payload : post)
            }
        case "DELETE":
            return {
                ...state,
                posts: state.posts.filter((post: IPost) => post._id !== action.payload),
                userPosts: state.userPosts.filter((post: IPost) => post._id !== action.payload)
            }
        case CLEAR_USER_POSTS:
            return {
                ...state,
                userPosts: []
            }
        default:
            return state;
    }
}
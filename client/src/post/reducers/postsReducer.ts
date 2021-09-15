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
    GET_USER_PHOTOS_FAILURE,
    GET_USER_PHOTOS_REQUEST,
    GET_USER_PHOTOS_SUCCESS,
    DELETE_FAIL,
    DELETE_REQUEST,
    DELETE_SUCCESS,
} from "../types"


const initialState = {
    posts: [] || null,
    loading: false,
    error: "",
    postsLoading: false,
    userPosts: [],
    photos: []
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
                postsLoading: true
            }
        case CREATE_POST_SUCCESS:
            console.log(state.photos.length)
            return {
                ...state,
                posts: [...state.posts, action.payload],
                userPosts: [...state.userPosts, action.payload],
                photos: [...state.photos, action.payload.selectedFile],
                postsLoading: false,
            }
        case CREATE_POST_FAIL:
            return {
                ...state,
                postsLoading: false,
                error: action.payload
            }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map((post: IPost) => post._id === action.payload._id ? action.payload : post),
                userPosts: state.userPosts.map((post: IPost) => post._id === action.payload._id ? action.payload : post)
            }
        case DELETE_REQUEST:
            return {
                ...state,
                postsLoading: true,
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter((post: IPost) => post._id !== action.payload),
                userPosts: state.userPosts.filter((post: IPost) => post._id !== action.payload),
                photos: state.photos.filter((photo: string) => photo !== action.payload.selectedFile)
            }
        case DELETE_FAIL:
            return {
                ...state,
               error: action.payload
            }
        case CLEAR_USER_POSTS:
            return {
                ...state,
                userPosts: []
            }
        case GET_USER_PHOTOS_REQUEST:
            return {
                ...state,
                postsLoading: true
            }
        case GET_USER_PHOTOS_SUCCESS:
            return {
                ...state,
                postsLoading: false,
                photos: action.payload
            }
        case GET_USER_PHOTOS_FAILURE:
            return {
                ...state,
                postsLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
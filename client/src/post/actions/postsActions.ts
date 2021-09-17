import { api, ICreatePost } from "../api"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, FETCH_ALL_FAIL, UPDATE_POST_SUCCESS, FETCH_ALL_SUCCESS, FETCH_ALL_REQUEST, CLEAR_USER_POSTS, GET_USER_PHOTOS_FAILURE, GET_USER_PHOTOS_REQUEST, GET_USER_PHOTOS_SUCCESS, DELETE_FAIL, DELETE_REQUEST, DELETE_SUCCESS } from "../types"

export const getPosts = () => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: FETCH_ALL_REQUEST })
    try {
        const { data } = await api.fetchPosts()
        dispatch({ type: FETCH_ALL_SUCCESS, payload: data })
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: FETCH_ALL_FAIL, payload: error.message })

        } else {
            console.log(error)
        }
    }
}

export const setUserPosts = (data: any) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        dispatch({ type: "SET_USER_POSTS", payload: data })
    } catch (error) {
        if (error instanceof Error) {
        } else {
            console.log(error)
        }
    }
}

export const createNewPost = (newPost: ICreatePost) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: CREATE_POST_REQUEST })
    try {
        const { data } = await api.createPost(newPost)
        dispatch({ type: CREATE_POST_SUCCESS, payload: data })
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: CREATE_POST_FAIL, payload: error.message })
        } else {
            console.log(error)
        }
    }
}

export const updatePost = (id: string, updatedPost: ICreatePost) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        const { data } = await api.updatePost(id, updatedPost)
        dispatch({ type: UPDATE_POST_SUCCESS, payload: data })
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: UPDATE_POST_SUCCESS, payload: error.message })
        } else {
            console.log(error)
        }
    }
}

export const removePost = (id: string) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: DELETE_REQUEST })

    try {
        await api.deletePost(id)
        dispatch({ type: DELETE_SUCCESS, payload: id })
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: DELETE_FAIL, payload: error.message })
        } else {
            console.log(error)
        }
    }
}

export const clearUserPosts = () => (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        dispatch({ type: CLEAR_USER_POSTS })
    } catch (error) {
        console.log(error);
    }
}

export const getUserPhotos = (id: string) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: GET_USER_PHOTOS_REQUEST })
    try {
        const { data } = await api.getUserPhotos(id)
        dispatch({ type: GET_USER_PHOTOS_SUCCESS, payload: data })
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: GET_USER_PHOTOS_FAILURE, payload: error.message })
        } else {
            console.log(error)
        }
    }
}
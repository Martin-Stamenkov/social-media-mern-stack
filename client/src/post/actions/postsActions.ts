import { api, ICreatePost } from "../api"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, FETCH_ALL_FAIL, UPDATE_POST_SUCCESS, FETCH_ALL_SUCCESS, FETCH_ALL_REQUEST } from "../types"

export const getPosts = () => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: FETCH_ALL_REQUEST })
    try {
        const { data } = await api.fetchPosts()
        dispatch({ type: FETCH_ALL_SUCCESS, payload: data })
    } catch (error) {
        if (error) {
            dispatch({ type: FETCH_ALL_FAIL, payload: error })

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
        if (error) {
            dispatch({ type: CREATE_POST_FAIL, payload: error })
        } else {
            console.log(error)
        }
    }
}

export const updatePost = (id: string, updatedPost: ICreatePost) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        const { data } = await api.updatePost(id, updatedPost)
        console.log(data)
        dispatch({ type: UPDATE_POST_SUCCESS, payload: data })
    } catch (error) {
        if (error) {
            dispatch({ type: UPDATE_POST_SUCCESS, payload: error })
        } else {
            console.log(error)
        }
    }
}

export const removePost = (id: string) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        await api.deletePost(id)
        dispatch({ type: "DELETE", payload: id })
    } catch (error) {
        console.log(error)
    }
}

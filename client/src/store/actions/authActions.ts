import { api, IFormData } from "auth"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { AUTH_FAILURE, AUTH_SUCCESS, AUTH_REQUEST, LOGOUT } from "store"
import { History } from 'history';


export const googleAuthLogin = (data: any) => (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        dispatch({ type: AUTH_SUCCESS, payload: data })
    } catch (error) {
        if (error) {
            dispatch({ type: AUTH_FAILURE, payload: error })
        } else {
            console.log(error)
        }
    }
}

export const login = (formData: IFormData, history: History) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: AUTH_REQUEST })
    try {
        const { data } = await api.login(formData)
        dispatch({ type: AUTH_SUCCESS, payload: data })

        history.push("/")
    } catch (error) {
        if (error) {
            console.log(error)
            dispatch({ type: AUTH_FAILURE, payload: error })
        } else {
            console.log(error)
        }
    }
}

export const register = (formData: IFormData, history: History) => async (dispatch: ThunkDispatch<void, void, Action>) => {
    dispatch({ type: AUTH_REQUEST })
    try {
        const { data } = await api.register(formData)
        dispatch({ type: AUTH_SUCCESS, payload: data })

        history.push("/")
    } catch (error) {
        if (error) {
            dispatch({ type: AUTH_FAILURE, payload: error })
        } else {
            console.log(error)
        }
    }
}

export const logout = () => (dispatch: ThunkDispatch<void, void, Action>) => {
    try {
        dispatch({ type: LOGOUT })
    } catch (error) {
        if (error) {
        } else {
            console.log(error)
        }
    }
}

import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT } from "../types";
import { Storage } from "storage";

const initialState = {
    authData: null,
    loading: false,
    error: ""
}

export const authReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return { ...state, loading: true }
        case AUTH_SUCCESS:
            Storage.setItem("profile", JSON.stringify({ ...action?.payload }))
            return { ...state, loading: false, authData: action?.payload }
        case AUTH_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case LOGOUT:
            Storage.removeItem("profile")
            return { ...state, authData: action?.payload }
        case GET_USER_REQUEST:
            return { ...state, loading: true }
        case GET_USER_SUCCESS:
            return { ...state,loading: false, authData: action?.payload }
        case GET_USER_FAILURE:
            return { ...state, error: action?.payload, loading: false }
        default:
            return state;
    }
}
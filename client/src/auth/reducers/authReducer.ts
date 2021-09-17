import { AUTH_FAILURE, 
    AUTH_REQUEST, 
    AUTH_SUCCESS, 
    GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGOUT, 
    UPDATE_USER_FAILURE, 
    UPDATE_USER_REQUEST, 
    UPDATE_USER_SUCCESS, 
    UPLOAD_USER_PHOTO_ERROR, 
    UPLOAD_USER_PHOTO_REQUEST, 
    UPLOAD_USER_PHOTO_SUCCESS } from "../types";
import { Storage } from "storage";

const initialState = {
    authData: null,
    loading: false,
    error: "",
}

export const authReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return { ...state, loading: true }
        case AUTH_SUCCESS:
            console.log(action?.payload)
            Storage.setItem("profile", JSON.stringify({ ...action?.payload }))
            return { ...state, loading: false, authData: action?.payload.result }
        case AUTH_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case LOGOUT:
            Storage.removeItem("profile")
            return { ...state, authData: action?.payload }
        case GET_USER_REQUEST:
            return { ...state, loading: true }
        case GET_USER_SUCCESS:
            console.log(action?.payload)
            return { ...state, loading: false, authData: action?.payload.result ? action?.payload?.result : action?.payload }
        case GET_USER_FAILURE:
            return { ...state, error: action?.payload, loading: false }
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true }
        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, authData: action?.payload }
        case UPDATE_USER_FAILURE:
            return { ...state, error: action?.payload, loading: false }
        case  UPLOAD_USER_PHOTO_REQUEST:
            return { ...state }
        case  UPLOAD_USER_PHOTO_SUCCESS:
            // Storage.setItem("profile", JSON.parse({ ...action?.payload }))
            return { ...state, authData: action?.payload }
        case  UPLOAD_USER_PHOTO_ERROR:
            return { ...state, error: action?.payload }
        default:
            return state;
    }
}
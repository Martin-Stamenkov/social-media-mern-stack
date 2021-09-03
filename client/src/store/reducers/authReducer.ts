import { Storage } from "storage";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from "store";

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
        default:
            return state;
    }
}
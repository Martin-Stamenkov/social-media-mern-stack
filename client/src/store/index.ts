export { createNewPost, getPosts } from "./actions/postsActions"
export {
    FETCH_ALL_SUCCESS, FETCH_ALL_REQUEST,
    FETCH_ALL_FAIL,
    CREATE_POST_FAIL,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    AUTH_FAILURE,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    LOGOUT,
    UPDATE_POST_SUCCESS
} from "./types/types"
export { googleAuthLogin, register, login, logout } from "./actions/authActions"
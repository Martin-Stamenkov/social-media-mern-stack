import { IPost } from "components/post/Post";

export interface Store {
    postsReducer: {
        posts: IPost[];
        loading: boolean;
        error: string;
        postLoading: boolean;
    }
}

export const FETCH_ALL_REQUEST = "FETCH_ALL_REQUEST";
export const FETCH_ALL_SUCCESS = "FETCH_ALL_SUCCESS";
export const FETCH_ALL_FAIL = "FETCH_ALL_FAIL";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";

export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";


export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";
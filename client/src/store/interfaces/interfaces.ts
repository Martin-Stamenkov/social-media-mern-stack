import { IPost } from "post";

export interface Store {
    postsReducer: {
        posts: IPost[];
        loading: boolean;
        error: string;
        postLoading: boolean;
    }
}

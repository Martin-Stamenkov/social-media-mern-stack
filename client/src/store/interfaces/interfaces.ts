import { IPost } from "post";

export interface Store {
    postsReducer: {
        posts: IPost[];
        loading: boolean;
        error: string;
        postsLoading: boolean;
        userPosts: IPost[];
        photos: string[];
    }
}

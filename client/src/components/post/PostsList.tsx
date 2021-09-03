import React, { SetStateAction } from 'react'

import { IPost, Post } from './Post'

interface IPostsList {
    posts: IPost[],
    setCurrentId: SetStateAction<{}>
}

export function PostsList({ posts, setCurrentId }: IPostsList) {
    return (
        <>
            {posts && posts.map((post: IPost, index: number) =>
                <Post setCurrentId={setCurrentId} key={index} _id={post._id} title={post.title} message={post.message} tags={post.tags} selectedFile={post.selectedFile} createdAt={post.createdAt} />
            ).reverse()}
        </>
    )
}

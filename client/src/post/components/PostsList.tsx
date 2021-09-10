import React, { SetStateAction } from 'react'
import { Storage } from 'storage'
import { userData } from 'utils'
import { IPost, Post } from './Post'

interface IPostsList {
    posts: IPost[],
    setCurrentId: SetStateAction<{}>
}

export function PostsList({ posts, setCurrentId }: IPostsList) {

    return (
        <>
            {posts && posts.map((post: IPost, index: number) =>
                <Post
                    setCurrentId={setCurrentId}
                    withEditOption={post.creatorId === (JSON.parse(Storage.getItem("profile") || "null")?.result?._id ?
                        JSON.parse(Storage.getItem("profile") || "null")?.result?._id :
                        JSON.parse(Storage.getItem("profile") || "null")?.result?.googleId)}
                    name={post.name} key={index} _id={post._id}
                    title={post.title} message={post.message}
                    tags={post.tags}
                    selectedFile={post.selectedFile}
                    createdAt={post.createdAt} />
            ).reverse()}
        </>
    )
}

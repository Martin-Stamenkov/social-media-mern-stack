import { API } from "api";
import { postDetailsUrl, postUrl, userPhotosUrl } from "./endpoints";

export interface ICreatePost {
    title: string,
    message: string,
    tags: string[],
    selectedFile: string,
    creatorId?: string,
    name?: string
}

export const fetchPosts = async () => {
    return await API.get(postUrl)
}

export const createPost = async (data: ICreatePost) => {
    return await API.post(postUrl, data)
}

export const updatePost = async (id: string, updatedData: ICreatePost) => {
    return await API.patch(`${postUrl}/${id}`, updatedData)
}

export const deletePost = async (id: string) => {
    return await API.delete(`${postUrl}/${id}`)
}

export const getUserPhotos = async (id: string) => {
    return await API.get(`${userPhotosUrl}/${id}`)
}

export const getPostDetails = async (id: string) => {
    return await API.get(postDetailsUrl(id))
}
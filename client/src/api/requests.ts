import axios from "axios";
import { postUrl } from "./endpoints";

export interface ICreatePost {
    title: string,
    message: string,
    tags: string[],
    selectedFile: string
}

export const fetchPosts = async () => {
    return await axios.get(postUrl)
}

export const createPost = async (data: ICreatePost) => {
    return await axios.post(postUrl, data)
}

export const updatePost = async (id: string, updatedData: ICreatePost) => {
    return await axios.patch(`${postUrl}/${id}`, updatedData)
}

export const deletePost = async (id: string) => {
    return await axios.delete(`${postUrl}/${id}`)
}
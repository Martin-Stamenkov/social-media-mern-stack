import axios from "axios"
import { Storage } from "storage"

export const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (Storage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(Storage.getItem("profile") || "null").token}`
    }
    return req
})

export const postUrl = `/posts`


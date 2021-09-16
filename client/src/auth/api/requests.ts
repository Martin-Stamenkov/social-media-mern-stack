import { getUserUrl, loginUrl, registerUrl, updateUserDataUrl, uploadUserPhotoUrl } from "./endpoints";
import { API } from "api/endpoints"


export interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    confirmPassword: string
}
export interface IDetailsData {
    hometown: string,
    city: string,
    education: string,
    occupation: string
}

export const login = async (data: IFormData) => {
    return await API.post(loginUrl, data)
}

export const register = async (data: IFormData) => {
    return await API.post(registerUrl, data)
}

export const getUser = async (id: string) => {
    return await API.get(getUserUrl(id))
}

export const uploadUserPhoto = async (id: string, data: string) => {
    return await API.patch(uploadUserPhotoUrl(id), { data })
}

export const updateUserData = async (id: string, data: IDetailsData) => {
    return await API.patch(updateUserDataUrl(id), { data })
}
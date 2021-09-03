import { loginUrl, registerUrl } from "./endpoints";
import { API } from "api/endpoints"


export interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    confirmPassword: string
}

export const login = async (data: IFormData) => {
    return await API.post(loginUrl, data)
}

export const register = async (data: IFormData) => {
    return await API.post(registerUrl, data)
}
import axios from "axios";
import { loginUrl, registerUrl } from "./endpoints";

export interface IFormData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    confirmPassword: string
}

export const login = async (data: IFormData) => {
    return await axios.post(loginUrl, data)
}

export const register = async (data: IFormData) => {
    return await axios.post(registerUrl, data)
}
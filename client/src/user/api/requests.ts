import { API } from "api"
import { getListOfUserByNameUrl } from "./endpoints"

export const getListOfUserByName = async (name: string) => {
    return await API.get(getListOfUserByNameUrl(name))
}
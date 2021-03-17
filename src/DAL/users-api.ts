import {
    CredentialsType,
    ProfileUserType,
    ArticlesWithCountType, BaseUserType
} from '../redux/common-types';
import axios, {AxiosResponse} from 'axios'
import {LoginCredentialsType} from "../components/login/login";

const DEFAULT_URL = 'http://localhost:8000/api/user/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export async function getResponse<T>(makeRequest: () => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
    try{
        return await makeRequest()
    } catch (err) {
        return err.response
    }
}


export const usersApi = {
    async getMyUserInfo() {
            return getResponse<BaseUserType>(async () => await axios.get(DEFAULT_URL + 'info/'))
    },
    async loginUser(userCredentials: LoginCredentialsType) {
            return getResponse<BaseUserType>(async () => await axios.post(DEFAULT_URL + 'login/', userCredentials))
    },
    async logoutUser() {
            return getResponse(async () => await axios.delete(DEFAULT_URL + 'login/'))
    },
    async signupUser(credentials: CredentialsType) {
            return getResponse(async () => await axios.post(DEFAULT_URL + 'register/', credentials))
    },
    async getUserInfoByUsername(username: string) {
        return getResponse<ProfileUserType>(async () => await axios.get(`${DEFAULT_URL + username}/info/`))
    },
    async getUserArticlesByUsername(username: string, page: number) {
        return getResponse<ArticlesWithCountType>(async () => (
            await axios.get(`${DEFAULT_URL + username}/articles/?page=${page}`))
        )
    },
    async setPhoto(photo: File) {
        const formData = new FormData()
        formData.append('photo', photo)
        return getResponse<{ photo: string }>(async () => await axios.post(DEFAULT_URL + 'upload/', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }))
    },
    async setAboutMe(username: string, aboutMe: string) {
        return getResponse(async () => await axios.patch(DEFAULT_URL +'info/', {aboutMe}))
    },
}
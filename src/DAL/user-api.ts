import {userType, userCredentialsType} from './../redux/reducers/reducer-types';
import axios, {AxiosResponse} from 'axios'

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

type responeType = {
    detail: string
}

export const userAPI = {
    async getUserInfo() {
            return getResponse<userType>(async () => await axios.get(DEFAULT_URL + 'info/'))
    },
    async loginUser(userCredentials: userCredentialsType) {
            return getResponse<userType>(async () => await axios.post(DEFAULT_URL + 'login/', userCredentials))
    },
    async logoutUser() {
            return getResponse<responeType>(async () => await axios.delete(DEFAULT_URL + 'login/'))
    },
    async signupUser(credentials: userCredentialsType) {
            return getResponse<responeType>(async () => await axios.post(DEFAULT_URL + 'register/', credentials))
    },

}
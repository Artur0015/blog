import { userType, responseType, userCredentialsType } from './../redux/reducers/reducer-types';
import axios from 'axios'

const DEFAULT_URL = 'http://localhost:8000/api/user/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


export const userAPI = {
    async getUserInfo() {
        return (await axios.get<userType>(DEFAULT_URL + 'info/')).data
    },
    async loginUser(userCredentials: userCredentialsType) {
        return (await axios.post<responseType>(DEFAULT_URL + 'login/', userCredentials)).data
    },
    async logoutUser() {
        return (await axios.delete<responseType>(DEFAULT_URL + 'login/')).data
    },
    async signupUser(credentials: userCredentialsType) {
        return (await axios.post<responseType>(DEFAULT_URL + 'register/', credentials)).data
    },

}
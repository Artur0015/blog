import {
    CredentialsType,
    ArticlesWithCountType,
    FullUserType,
    LoginCredentialsType,
    UserEditableFieldsType,
    ArticleRequestParamsType,
    BaseUserType
} from '../common-types';
import axios from 'axios'
import {BACKEND_API_URL} from "./configs-and-tools";

const URL = BACKEND_API_URL + 'users/'


export const usersApi = {
    async getMyUserInfo() {
        return await axios.get<BaseUserType>(`${URL}me/`)
    },
    async loginUser(credentials: LoginCredentialsType) {
        return await axios.post<BaseUserType>(`${URL}login/`, credentials)
    },
    async logoutUser() {
        return await axios.delete<void>(`${URL}login/`)
    },
    async signupUser(credentials: CredentialsType) {
        return await axios.post<void>(URL, credentials)
    },
    async getUserInfoByUsername(username: string) {
        return await axios.get<FullUserType>(`${URL + username}/`)
    },
    async getUserArticlesByUsername(username: string, {currentPage, pageSize}: ArticleRequestParamsType) {
        return await axios.get<ArticlesWithCountType>(
            `${URL + username}/articles/?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`)
    },
    async changeUser(fields: UserEditableFieldsType) {
        let data: UserEditableFieldsType | FormData = fields
        let headers: undefined | { 'Content-Type': string }
        if (fields.photo) {
            data = new FormData()
            let i: keyof typeof fields
            for (i in fields) {
                const value = fields[i]
                if (value) {
                    data.append(i, value)
                }
            }
        }
        return await axios.patch<{photo?: string}>(`${URL}me/`, data, {headers})
    }
}
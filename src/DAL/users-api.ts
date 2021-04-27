import {
    CredentialsType,
    ArticlesWithCountType,
    FullUserType,
    UserEditableFieldsType,
    ArticleRequestParamsType,
    BaseUserType
} from '../common-types';
import {instanceWithoutToken, instanceWithToken} from "./configs-and-tools";


export const usersApi = {
    async getMyUserInfo() {
        return await instanceWithToken.get<BaseUserType>('users/me/')
    },
    async loginUser(credentials: CredentialsType) {
        return await instanceWithoutToken.post<{ user: BaseUserType, token: string }>('auth/', credentials)
    },
    async signupUser(credentials: CredentialsType) {
        return await instanceWithoutToken.post<void>('users/', credentials)
    },
    async getUserInfoByUsername(username: string) {
        return await instanceWithoutToken.get<FullUserType>(`users/${username}/`)
    },
    async getUserArticlesByUsername(username: string, {currentPage, pageSize}: ArticleRequestParamsType) {
        return await instanceWithoutToken.get<ArticlesWithCountType>(
            `users/${username}/articles/?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`)
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
        return await instanceWithToken.patch<{photo?: string}>(`users/me/`, data, {headers})
    }
}
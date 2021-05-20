import {
    CredentialsType,
    ArticlesWithCountType,
    FullUserType,
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
        return await instanceWithToken.get<FullUserType>(`users/${username}/`)
    },
    async getUserArticlesByUsername(username: string, {currentPage, pageSize}: ArticleRequestParamsType) {
        return await instanceWithoutToken.get<ArticlesWithCountType>(
            `users/${username}/articles/?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`)
    },
    async changeUserAboutMe(aboutMe: string) {
        return await instanceWithToken.patch<void>(`users/me/`, {aboutMe})
    },
    async changeUserPhoto(photo: File) {
        const formData = new FormData()
        formData.append('photo', photo)
        return await instanceWithToken.patch<{photo: string}>('users/me/', formData)
    },
    async subscribe(username: string) {
        return await instanceWithToken.post<void>(`users/${username}/subscribers/`)
    },
    async unsubscribe(username: string) {
        return await instanceWithToken.delete<void>(`users/${username}/subscribers/`)
    },
    async getMySubscriptions() {
        return await instanceWithToken.get<Array<BaseUserType>>('subscriptions/')
    }
}
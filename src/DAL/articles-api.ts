import axios from 'axios';
import {
    ArticleBodyType,
    FullArticleType,
    CommentType, ArticlesWithCountType, ArticleRequestParamsType, CreateSuccessResponseType
} from '../common-types';
import {BACKEND_API_URL} from "./configs-and-tools";


const URL = BACKEND_API_URL + 'articles/'


export const articlesAPI = {
    async getArticlesOfPage({currentPage, pageSize}: ArticleRequestParamsType) {
        return await axios.get<ArticlesWithCountType>(
            `${URL}?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`)

    },
    async getArticle(id: number) {
        return await axios.get<FullArticleType>(`${URL}${id}/`)
    },
    async getArticleComments(articleId: number) {
        return await axios.get<Array<CommentType>>(`${URL}${articleId}/comments/`)
    },
    async changeArticle(id: number, article: ArticleBodyType) {
        return await axios.patch<void>(`${URL}${id}/`, article)
    },
    async addArticle(article: ArticleBodyType) {
        let data: ArticleBodyType | FormData = article
        let headers: undefined | { 'Content-Type': string }
        if (article.photo) {
            data = new FormData()
            headers = {'Content-Type': 'multipart/form-data'}
            let i: keyof typeof article
            for (i in article) {
                const value = article[i]
                if (value) {
                    data.append(i, value)
                }
            }
        }
        return await axios.post<CreateSuccessResponseType>(URL, data, {headers})
    },
    async addComment(articleId: number, text: string) {
        return await axios.post<CreateSuccessResponseType>(`${URL}${articleId}/comments/`, {text})
    },
    async deleteComment(id: number) {
        return await axios.delete<void>(`${BACKEND_API_URL}comments/${id}/`)
    },
    async changeComment(id: number, text: string) {
        return await axios.put<void>(`${BACKEND_API_URL}comments/${id}/`, {text})
    },
    async deleteArticle(id: number) {
        return await axios.delete<void>(`${URL}${id}/`)
    },
    async putLike(articleId: number) {
        return await axios.post<void>(`${URL}${articleId}/likes/`)
    },
    async deleteLike(articleId: number) {
        return await axios.delete<void>(`${URL}${articleId}/likes/`)
    },
    async deleteDislike(articleId: number) {
        return await axios.delete<void>(`${URL}${articleId}/dislikes/`)
    },
    async putDislike(articleId: number) {
        return await axios.post<void>(`${URL}${articleId}/dislikes/`)
    },
}


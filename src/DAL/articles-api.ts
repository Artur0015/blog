import axios from 'axios';
import {ArticleType, BaseArticleType, CommentType} from '../redux/common-types';
import {getResponse} from "./users-api";


const DEFAULT_URL = 'http://localhost:8000/api/articles/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


export type MenuType = {
    count: number
    articles: Array<ArticleType>
}

export const menuAPI = {
    async getArticlesOfPage(page: number) {
        return getResponse<MenuType>(async () => await axios.get(`${DEFAULT_URL}?page=${page}`))

    },
    async getArticle(id: number) {
        return getResponse<ArticleType>(async () => await axios.get(DEFAULT_URL + id + '/'))
    },
    async getArticleComments(articleId: number) {
        return getResponse<Array<CommentType>>(async () => await axios.get(DEFAULT_URL + articleId + '/comments/'))
    },
    async changeArticle(articleId: number, text: string) {
        return getResponse<ArticleType>(async () => await axios.patch(DEFAULT_URL + articleId + '/', {text}))
    },
    async addArticle(article: BaseArticleType) {
        return getResponse<ArticleType>(async () => await axios.post(DEFAULT_URL, article))
    },
    async addComment(articleId: number, commentText: string) {
        return getResponse<CommentType>(async () => await axios.post(DEFAULT_URL + articleId + '/comments/',
            { text: commentText }))
    }
}


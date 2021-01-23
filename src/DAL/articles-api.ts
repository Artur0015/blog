import axios from 'axios';
import { articleType, commentType} from './../redux/reducers/reducer-types';
import {getResponse} from "./user-api";


const DEFAULT_URL = 'http://localhost:8000/api/articles/'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export type getArticlesOfPageResponseType = {
    count: number
    next: string | null
    previos: string | null
    results: Array<articleType>
}

export const menuAPI = {
    async getArticlesOfPage(page: number) {
        return getResponse<getArticlesOfPageResponseType>(async () => await axios.get(`${DEFAULT_URL}?page=${page}`))

    },
    async getArticle(id: number) {
        return getResponse<articleType>(async () => await axios.get(DEFAULT_URL + id + '/'))
    },
    async getArticleComments(articleId: number) {
        return getResponse<Array<commentType>>(async () => await axios.get(DEFAULT_URL + articleId + '/comments/'))
    },
    async changeArticle(changedArticle: articleType) {
        return getResponse<articleType>(async () => await axios.put(DEFAULT_URL + changedArticle.id + '/', changedArticle))
    },
    async addArticle(article: articleType) {
        return getResponse<articleType>(async () => await axios.post(DEFAULT_URL, article))
    },
    async addComment(articleId: number, commentText: string) {
        return getResponse<commentType>(async () => await axios.post(DEFAULT_URL + articleId + '/comments/',
            { text: commentText }))
    }
}


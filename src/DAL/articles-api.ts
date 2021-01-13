import axios from 'axios';
import { articleType, commentType, responseType } from './../redux/reducers/reducer-types';


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
        return (await axios.get<getArticlesOfPageResponseType>(`${DEFAULT_URL}?page=${page}`)).data

    },
    async getArticle(id: number) {
        return (await axios.get<articleType>(DEFAULT_URL + id + '/')).data
    },
    async getArticleComments(articleId: number) {
        return (await axios.get<Array<commentType>>(DEFAULT_URL + articleId + '/comments/')).data
    },
    async changeArticle(changedArticle: articleType) {
        return (await axios.put<articleType>(DEFAULT_URL + changedArticle.id + '/', changedArticle)).data
    },
    async addArticle(article: articleType) {
        return (await axios.post<articleType>(DEFAULT_URL, article)).data
    },
    async addComment(articleId: number, commentText: string) {
        return (await axios.post<responseType>(DEFAULT_URL + articleId + '/comments/', { text: commentText })).data
    }
}


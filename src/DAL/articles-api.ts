import axios from 'axios';
import {
    ArticleBodyType,
    CommonArticleType,
    ArticlePageType,
    CommentType
} from '../redux/common-types';
import {getResponse} from "./users-api";


const DEFAULT_URL = 'http://localhost:8000/api/articles/'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


export type MenuType = {
    count: number
    articles: Array<CommonArticleType>
}

export const articlesAPI = {
    async getArticlesOfPage(page: number) {
        return getResponse<MenuType>(async () => await axios.get(`${DEFAULT_URL}?page=${page}`))

    },
    async getArticle(id: number) {
        return getResponse<ArticlePageType>(async () => await axios.get(DEFAULT_URL + id + '/'))
    },
    async getArticleComments(articleId: number) {
        return getResponse<Array<CommentType>>(async () => await axios.get(DEFAULT_URL + articleId + '/comments/'))
    },
    async changeArticle(articleId: number, article: ArticleBodyType) {
        return getResponse(async () => await axios.patch(DEFAULT_URL + articleId + '/', article))
    },
    async addArticle(article: ArticleBodyType) {
        return getResponse<number>(async () => await axios.post(DEFAULT_URL, article))
    },
    async addComment(articleId: number, commentText: string) {
        return getResponse<CommentType>(async () => await axios.post(DEFAULT_URL + articleId + '/comments/',
            {text: commentText}))
    },
    async deleteComment(commentId: number) {
        return getResponse(async () => await axios.delete('http://localhost:8000/api/comments/' + commentId))
    },
    async deleteArticle(articleId: number) {
        return getResponse(async () => await axios.delete(DEFAULT_URL + articleId))
    },
    async putLike(articleId: number) {
        return getResponse(async () => await axios.post(DEFAULT_URL + articleId + '/likes/'))
    },
    async deleteLike(articleId: number) {
        return getResponse(async () => await axios.delete(DEFAULT_URL + articleId + '/likes/'))
    },
    async deleteDislike(articleId: number) {
        return getResponse(async () => await axios.delete(DEFAULT_URL + articleId + '/dislikes/'))
    },
    async putDislike(articleId: number) {
        return getResponse(async () => await axios.post(DEFAULT_URL + articleId + '/dislikes/'))
    },
}


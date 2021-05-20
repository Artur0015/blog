import {
    ArticleBodyType,
    FullArticleType,
    CommentType, ArticlesWithCountType, ArticleRequestParamsType, CreateSuccessResponseType
} from '../common-types';
import {instanceWithoutToken, instanceWithToken} from "./configs-and-tools";


export const articlesAPI = {
    async getArticlesOfPage({currentPage, pageSize}: ArticleRequestParamsType) {
        return await instanceWithoutToken.get<ArticlesWithCountType>(
            `articles/?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`)

    },
    async getSubscribedArticles({currentPage, pageSize}: ArticleRequestParamsType) {
        return await instanceWithToken.get<ArticlesWithCountType>(
            `subscriptions/articles/?page=${currentPage}${pageSize ? `&page_size=${pageSize}` : ''}`
        )
    },
    async getArticle(id: number) {
        return await instanceWithToken.get<FullArticleType>(`articles/${id}/`)
    },
    async getArticleComments(articleId: number) {
        return await instanceWithoutToken.get<Array<CommentType>>(`articles/${articleId}/comments/`)
    },
    async changeArticle(id: number, article: ArticleBodyType) {
        return await instanceWithToken.patch<void>(`articles/${id}/`, article)
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
        return await instanceWithToken.post<CreateSuccessResponseType>('articles/', data, {headers})
    },
    async addComment(articleId: number, text: string) {
        return await instanceWithToken.post<CreateSuccessResponseType>(`articles/${articleId}/comments/`, {text})
    },
    async deleteComment(id: number) {
        return await instanceWithToken.delete<void>(`comments/${id}/`)
    },
    async changeComment(id: number, text: string) {
        return await instanceWithToken.put<void>(`comments/${id}/`, {text})
    },
    async deleteArticle(id: number) {
        return await instanceWithToken.delete<void>(`articles/${id}/`)
    },
    async putLike(articleId: number) {
        return await instanceWithToken.post<void>(`articles/${articleId}/likes/`)
    },
    async deleteLike(articleId: number) {
        return await instanceWithToken.delete<void>(`articles/${articleId}/likes/`)
    },
    async deleteDislike(articleId: number) {
        return await instanceWithToken.delete<void>(`articles/${articleId}/dislikes/`)
    },
    async putDislike(articleId: number) {
        return await instanceWithToken.post<void>(`articles/${articleId}/dislikes/`)
    },
}


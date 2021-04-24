import {RootStateType} from "./store";

export const getArticleSelector = (state: RootStateType) => state.articlePage.article

export const getArticleCommentsSelector = (state: RootStateType) => state.articlePage.comments

export const  getCurrentUserSelector = (state: RootStateType) => state.auth

export const getArticlesOfCurrentPageSelector = (state: RootStateType) => state.menu.articles.data

export const getArticlesCountSelector = (state: RootStateType) => state.menu.articles.count

export const getProfileUserSelector = (state: RootStateType) => state.profile
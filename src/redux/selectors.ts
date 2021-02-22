import {AppStateType} from "./redux-store";

export const getArticleSelector = (state: AppStateType) => state.articleReducer.article

export const getArticleCommentsSelector = (state: AppStateType) => state.articleReducer.comments

export const  getCurrentUserSelector = (state: AppStateType) => state.authReducer

export const getArticlesOfCurrentPageSelector = (state: AppStateType) => state.menuReducer.articles

export const getArticlesCountSelector = (state: AppStateType) => state.menuReducer.count

export const getProfileUserSelector = (state: AppStateType) => state.profileReducer
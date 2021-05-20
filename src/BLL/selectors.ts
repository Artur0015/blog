import {RootStateType} from "./store";

export const articleSelector = (state: RootStateType) => state.articlePage.article

export const articleCommentsSelector = (state: RootStateType) => state.articlePage.comments

export const  currentUserSelector = (state: RootStateType) => state.auth

export const articlesOfCurrentPageSelector = (state: RootStateType) => state.menu.data

export const articlesCountSelector = (state: RootStateType) => state.menu.count

export const profileSelector = (state: RootStateType) => state.profile

export const usersSelector = (state: RootStateType) => state.users
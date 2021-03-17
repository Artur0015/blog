import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

export type CommentType = {
    id: number
    text: string,
    author: BaseUserType
}

export type ArticleBodyType = {
    header: string
    text: string
}

export interface CommonArticleType {
    header: string
    author: string
    id: number
    likes: number
    dislikes: number
    pubDate: string
}

export interface ArticlePageType extends CommonArticleType {
    text: string
    isLiked: boolean
    isDisliked: boolean
}

export type BaseUserType = {
    id: number
    username: string
    photo: string
}

export type UserType = { isAuthenticated: false } | ({ isAuthenticated: true } & BaseUserType)

export type CredentialsType = {
    username: string
    password: string
}

export type ProfileUserType = BaseUserType & { aboutMe: string }

export type ArticlesWithCountType = {
    count: number
    data: Array<CommonArticleType>
}

export interface FullProfileType extends ProfileUserType {
    articles: ArticlesWithCountType
}


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type BaseThunkType<A extends Action, R = void, C = unknown> = ThunkAction<Promise<R>, AppStateType, C, A>

export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type DispatchType<T extends Action> = ThunkDispatch<AppStateType, void, T>

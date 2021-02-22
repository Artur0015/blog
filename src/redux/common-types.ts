import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

export type CommentType = {
    text: string,
    author: string,
}

export type BaseArticleType = {
    header: string
    text: string
    author: string
}

export interface ArticleType extends BaseArticleType{
    id: number
}

export type UserType = {
    id: number
    username: string
    photo: string
}

export type UserCredentialsType = {
    username: string
    password: string
}

export type SignupCredentialsType = UserCredentialsType & {
    passwordConfirmation: string
}

export interface ProfileType extends UserType {
    articles: {
        count: number
        articles: Array<ArticleType>
    }
    aboutMe: string
}


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

export type BaseThunkType<A extends Action, R = void, C = unknown> = ThunkAction<Promise<R>, AppStateType, C, A>

export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type DispatchType<T extends Action> = ThunkDispatch<AppStateType, void, T>

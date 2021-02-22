import {BaseArticleType, BaseThunkType, InferActionsType} from '../common-types';
import {menuAPI} from "../../DAL/articles-api"
import {ArticleType, CommentType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";

const initialState = {
    article: {} as ArticleType,
    comments: [] as Array<CommentType>,
}

type InitialStateType = typeof initialState

export type ActionsType = InferActionsType<typeof actions>

export const articleReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'setArticle':
            return {...state, article: action.article}
        case 'setComments':
            return {...state, comments: action.comments}
        case 'addComment':
            return {...state, comments: [...state.comments, action.comment]}
        default:
            return state
    }
}


const actions = {
    setArticle: (article: ArticleType) => ({type: 'setArticle', article} as const),
    setComments: (comments: Array<CommentType>) => ({type: 'setComments', comments} as const),
    addCommentToState: (comment: CommentType) => ({type: 'addComment', comment} as const)
}

type ThunkType = BaseThunkType<ActionsType>

export const getArticle = (articleId: number): ThunkType => async (dispatch) => {
    const response = await menuAPI.getArticle(articleId)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setArticle(response.data))
    }
}

export const getArticleComments = (articleId: number): ThunkType => async (dispatch) => {
    const response = (await menuAPI.getArticleComments(articleId))
    if (response.status === statusCodes.OK) {
        dispatch(actions.setComments(response.data))
    }
}

export const addComment = (articleId: number, commentText: string): ThunkType => async (dispatch) => {
    const response = await menuAPI.addComment(articleId, commentText)
    if (response.status === statusCodes.CREATED) {
        dispatch(actions.addCommentToState(response.data))
    }
}

export const changeArticle = (articleId: number, text: string): ThunkType => async (dispatch) => {
    const response = await menuAPI.changeArticle(articleId, text)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setArticle(response.data))
    }
}

export const addArticle = (article: BaseArticleType): ThunkType => async (dispatch) => {
    await menuAPI.addArticle(article)
}
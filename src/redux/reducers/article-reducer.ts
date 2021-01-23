import { baseThunkType, inferActionsType} from '../redux-store';
import { menuAPI } from "../../DAL/articles-api"
import {articleType, commentType} from "./reducer-types";
import {statusCodes} from "../../DAL/response-status-codes";

let initialState = {
    article: {} as articleType,
    comments: [] as Array<commentType>,
}

type initialStateType = typeof initialState

export type actionsType = inferActionsType<typeof actions>

export const articleReducer = (state: initialStateType = initialState, action: actionsType): initialStateType => {
    let stateCopy = { ...state }
    switch (action.type) {
        case 'setArticle':
            stateCopy.article = action.article
            return stateCopy
        case 'setComments':
            stateCopy.comments = action.comments
            return stateCopy
        case 'addComent':
            stateCopy.comments = [...state.comments]
            stateCopy.comments.push({ text: action.text, author: action.author });
            return stateCopy
        default:
            return state
    }
}


const actions = {
    setArticle: (article: articleType) => ({
        type: 'setArticle',
        article
    } as const),
    setComments: (comments: Array<commentType>) => ({
        type: 'setComments',
        comments
    } as const),
    addCommentToState: (text: string, author: string) => ({
        type: 'addComent',
        text,
        author
    } as const)
}

type thunkType = baseThunkType<actionsType>

export const getArticle = (articleId: number): thunkType => async (dispatch) => {
    const response = await menuAPI.getArticle(articleId)
    if(response.status === statusCodes.OK) {
        dispatch(actions.setArticle(response.data))
    }
}

export const getArticleComments = (articleId: number): thunkType => async (dispatch) => {
    const response = (await menuAPI.getArticleComments(articleId))
    if(response.status === statusCodes.OK) {
        dispatch(actions.setComments(response.data))
    }
}

export const addComment = (articleId: number, commentText: string): thunkType => async (dispatch) => {
   const response = await menuAPI.addComment(articleId, commentText)
    if(response.status === statusCodes.CREATED) {
        dispatch(actions.addCommentToState(response.data.text,response.data.author))
    }
}

export const changeArticle = (changedArticle: articleType): thunkType => async (dispatch) => {
    const response = await menuAPI.changeArticle(changedArticle)
    if(response.status === statusCodes.OK) {
        dispatch(actions.setArticle(response.data))
    }
}

export const addArticle = (article: articleType): thunkType => async (dispatch) => {
    await menuAPI.addArticle(article)
}
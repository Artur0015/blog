import { baseThunkType, inferActionsType} from './../redux-store';
import { menuAPI } from "../../DAL/articles-api"
import {articleType, commentType} from "./reducer-types";

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
    const article = await menuAPI.getArticle(articleId)
    dispatch(actions.setArticle(article))

}

export const getArticleComments = (articleId: number): thunkType => async (dispatch) => {
    const comments = await menuAPI.getArticleComments(articleId)
    dispatch(actions.setComments(comments))
}


export const changeArticle = (changedArticle: articleType): thunkType => async (dispatch) => {
    menuAPI.changeArticle(changedArticle)
}

export const addArticle = (article: articleType): thunkType => async (dispatch) => {
    await menuAPI.addArticle(article)
}

export const addComment = (articleId: number, comment: commentType): thunkType => async (dispatch) => {
   menuAPI.addComment(articleId, comment.text)
    dispatch(actions.addCommentToState(comment.text, comment.author))

}
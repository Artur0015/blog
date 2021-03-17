import {ArticleBodyType, ArticlePageType, BaseThunkType, InferActionsType} from '../common-types';
import {articlesAPI} from "../../DAL/articles-api"
import {CommentType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";
import {errorActions, ErrorActionsType} from "./error-reducer";
import errors from "../errors";

const initialState = {
    article: {} as ArticlePageType,
    comments: [] as Array<CommentType>,
}

type InitialStateType = typeof initialState

export type ActionsType = InferActionsType<typeof actions>

export const articleReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'articleReducer/setArticle':
            return {...state, article: action.article}
        case 'articleReducer/changeArticleText':
            return {...state, article: {...state.article, ...action.article}}
        case 'articleReducer/putLike':
            return {
                ...state,
                article: {
                    ...state.article, isLiked: true, isDisliked: false, likes: state.article.likes + 1,
                    dislikes: state.article.isDisliked ? state.article.dislikes - 1 : state.article.dislikes
                }
            }
        case 'articleReducer/deleteLike':
            return {...state, article: {...state.article, isLiked: false, likes: state.article.likes - 1}}
        case 'articleReducer/putDislike':
            return {
                ...state,
                article: {
                    ...state.article, isDisliked: true, isLiked: false, dislikes: state.article.dislikes + 1,
                    likes: state.article.isLiked ? state.article.likes - 1 : state.article.likes
                }
            }
        case 'articleReducer/deleteDislike':
            return {...state, article: {...state.article, isDisliked: false, dislikes: state.article.dislikes - 1}}
        case 'articleReducer/setComments':
            return {...state, comments: action.comments}
        case 'articleReducer/addComment':
            return {...state, comments: [action.comment, ...state.comments]}
        case 'articleReducer/deleteComment':
            return {...state, comments: state.comments.filter(comment => comment.id !== action.commentId)}
        default:
            return state
    }
}


const actions = {
    setArticle: (article: ArticlePageType) => ({type: 'articleReducer/setArticle', article} as const),
    changeArticle: (article: ArticleBodyType) => ({type: 'articleReducer/changeArticleText', article} as const),
    setComments: (comments: Array<CommentType>) => ({type: 'articleReducer/setComments', comments} as const),
    addCommentToState: (comment: CommentType) => ({type: 'articleReducer/addComment', comment} as const),
    deleteComment: (commentId: number) => ({type: 'articleReducer/deleteComment', commentId} as const),
    putLike: () => ({type: 'articleReducer/putLike'} as const),
    deleteLike: () => ({type: 'articleReducer/deleteLike'} as const),
    putDislike: () => ({type: 'articleReducer/putDislike'} as const),
    deleteDislike: () => ({type: 'articleReducer/deleteDislike'} as const)
}

type ThunkType = BaseThunkType<ActionsType | ErrorActionsType>

type ThunkTypeWithReturn = BaseThunkType<ActionsType | ErrorActionsType, number | 'error'>


export const getArticle = (articleId: number): ThunkType => async (dispatch) => {
    const response = await articlesAPI.getArticle(articleId)
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setArticle(response.data))
    } else if (!(response && response.status === statusCodes.NOT_FOUND)) {
        dispatch(errorActions.setError(errors.articlePullFail))
    }
}

export const getArticleComments = (articleId: number): ThunkType => async (dispatch) => {
    const response = (await articlesAPI.getArticleComments(articleId))
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setComments(response.data))
    } else if (!(response && response.status === statusCodes.NOT_FOUND)) {
        dispatch(errorActions.setError(errors.commentsPullFail))
    }
}

export const addComment = (articleId: number, commentText: string): ThunkType => async (dispatch) => {
    const response = await articlesAPI.addComment(articleId, commentText)
    if (response && response.status === statusCodes.CREATED) {
        dispatch(actions.addCommentToState(response.data))
    } else {
        dispatch(errorActions.setError(errors.commentLoadFail))
    }
}

export const changeArticle = (articleId: number, article: ArticleBodyType): ThunkType => async (dispatch) => {
    dispatch(actions.changeArticle(article))
    const response = await articlesAPI.changeArticle(articleId, article)
    if (!(response && response.status === statusCodes.ACCEPTED)) {
        dispatch(errorActions.setError(errors.articleChangeFail))
    }
}

export const addArticle = (article: ArticleBodyType): ThunkTypeWithReturn => async (dispatch) => {
    const response = await articlesAPI.addArticle(article)
    if(response && response.status === statusCodes.CREATED) {
        return response.data
    }
    else {
        dispatch(errorActions.setError(errors.articleLoadFail))
        return 'error'
    }
}

export const deleteComment = (commentId: number): ThunkType => async (dispatch) => {
    dispatch(actions.deleteComment(commentId))
    const response = await articlesAPI.deleteComment(commentId)
    if (!(response && response.status === statusCodes.OK_NO_CONTENT)) {
        dispatch(errorActions.setError(errors.commentDeleteFail))
    }
}

export const putLike = (articleId: number): ThunkType => async (dispatch) => {
    dispatch(actions.putLike())
    const response = await articlesAPI.putLike(articleId)
    if (!(response && response.status === statusCodes.CREATED)) {
        dispatch(errorActions.setError(errors.putLikeFail))
        dispatch(actions.deleteLike())
    }
}

export const putDislike = (articleId: number): ThunkType => async (dispatch) => {
    dispatch(actions.putDislike())
    const response = await articlesAPI.putDislike(articleId)
    if (!(response && response.status === statusCodes.CREATED)) {
        dispatch(errorActions.setError((errors.putDislikeFail)))
        dispatch(actions.deleteDislike())
    }

}

export const deleteLike = (articleId: number): ThunkType => async (dispatch) => {
    dispatch(actions.deleteLike())
    const response = await articlesAPI.deleteLike(articleId)
    if (!(response && response.status === statusCodes.OK_NO_CONTENT)) {
        dispatch(errorActions.setError(errors.likeDeleteFail))
        dispatch(actions.putLike())
    }

}

export const deleteDislike = (articleId: number): ThunkType => async (dispatch) => {
    dispatch(actions.deleteDislike())
    const response = await articlesAPI.deleteDislike(articleId)
    if (!(response && response.status === statusCodes.OK_NO_CONTENT)) {
        dispatch(errorActions.setError((errors.dislikeDeleteFail)))
        dispatch(actions.putDislike())
    }
}
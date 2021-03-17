import {statusCodes} from "../../DAL/response-status-codes";
import {
    CommonArticleType,
    BaseThunkType,
    InferActionsType,
    ProfileUserType,
    ArticlesWithCountType
} from "../common-types";
import {usersApi} from "../../DAL/users-api";
import {articlesAPI} from "../../DAL/articles-api";
import {errorActions, ErrorActionsType} from "./error-reducer";
import errors from "../errors";


const initialState = {
    id: null as number | null,
    username: null as string | null,
    photo: null as string | null,
    articles: {
        data: [] as Array<CommonArticleType>,
        count: 0
    },
    aboutMe: null as string | null
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profileReducer/setUserInfo':
            return {...action.user, articles: {...state.articles}}
        case 'profileReducer/setUserArticles':
            return {...state, articles: action.articles}
        case 'profileReducer/setUserAboutMe':
            return {...state, aboutMe: action.aboutMe}
        case 'profileReducer/setPhoto':
            return {...state, photo: action.photo}
        case 'profileReducer/deleteArticle':
            return {
                ...state,
                articles: {
                    count: state.articles.count - 1,
                    data: state.articles.data.filter(a => a.id !== action.articleId)
                }
            }
        default:
            return state
    }
}

const actions = {
    setUserInfo: (user: ProfileUserType) => ({type: 'profileReducer/setUserInfo', user} as const),
    setUserArticles: (articles: ArticlesWithCountType) => ({type: 'profileReducer/setUserArticles', articles} as const),
    setPhoto: (photo: string) => ({type: 'profileReducer/setPhoto', photo} as const),
    deleteArticle: (articleId: number) => ({type: 'profileReducer/deleteArticle', articleId} as const),
    setUserAboutMe: (aboutMe: string) => ({type: 'profileReducer/setUserAboutMe', aboutMe} as const)
}

export type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType | ErrorActionsType>

export const getUserProfileInfo = (username: string): ThunkType => async (dispatch) => {
    const response = await usersApi.getUserInfoByUsername(username)
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setUserInfo(response.data))
    } else if (!(response && response.status === statusCodes.NOT_FOUND)) {
        dispatch(errorActions.setError(errors.profileInfoPullFail))
    }
}

export const getUserArticles = (username: string, page: number): ThunkType => async (dispatch) => {
    const response = await usersApi.getUserArticlesByUsername(username, page)
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setUserArticles(response.data))
    } else if (!(response && response.status === statusCodes.NOT_FOUND)) {
        dispatch(errorActions.setError(errors.profileArticlesPullFail))
    }
}

export const setMyUserPhoto = (photo: File): ThunkType => async (dispatch) => {
    const response = await usersApi.setPhoto(photo)
    if (response && response.status === statusCodes.CREATED) {
        dispatch(actions.setPhoto(response.data.photo))
    } else {
        dispatch(errorActions.setError(errors.photoChangeFail))
    }
}

export const setMyUserAboutMe = (username: string, text: string): ThunkType => async (dispatch) => {
    const response = await usersApi.setAboutMe(username, text)
    if (response && response.status === statusCodes.ACCEPTED) {
        dispatch(actions.setUserAboutMe(text))
    } else {
        dispatch(errorActions.setError(errors.infoChangeFail))
    }
}

export const deleteArticle = (articleId: number): ThunkType => async (dispatch) => {
    const response = await articlesAPI.deleteArticle(articleId)
    if (response && response.status === statusCodes.OK_NO_CONTENT) {
        dispatch(actions.deleteArticle(articleId))
    } else {
        dispatch(errorActions.setError(errors.articleDeleteFail))
    }
}
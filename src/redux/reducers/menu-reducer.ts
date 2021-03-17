import {BaseThunkType, InferActionsType} from '../common-types';
import {articlesAPI, MenuType} from "../../DAL/articles-api"
import {CommonArticleType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";
import {errorActions, ErrorActionsType} from "./error-reducer";
import errors from "../errors";

const initialState = {
    articles: [] as Array<CommonArticleType>,
    count: null as number | null
}

type InitialStateType = typeof initialState

export type ActionsType = InferActionsType<typeof actions>

export const menuReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'menuReducer/setArticles':
            return {...action.menu}
        default:
            return state;
    }
}


export type ThunkType = BaseThunkType<ActionsType | ErrorActionsType>

const actions = {
    setArticles: (menu: MenuType) => ({type: 'menuReducer/setArticles', menu} as const)
}
export const getArticlesOfPage = (page: number): ThunkType => async (dispatch) => {
    const response = await articlesAPI.getArticlesOfPage(page)
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setArticles(response.data))
    } else if(!(response && response.status === statusCodes.NOT_FOUND)) {
        dispatch(errorActions.setError(errors.articlesPagePullFail))
    }
}
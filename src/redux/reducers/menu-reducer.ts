import {BaseThunkType, InferActionsType} from '../common-types';
import {menuAPI, MenuType} from "../../DAL/articles-api"
import {ArticleType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";

const initialState = {
    articles: [] as Array<ArticleType>,
    count: null as number | null
}

type InitialStateType = typeof initialState

export type ActionsType = InferActionsType<typeof actions>

export const menuReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'setArticles':
            return {...action.menu}
        default:
            return state;
    }
}


export type ThunkType = BaseThunkType<ActionsType>

const actions = {
    setArticles: (menu: MenuType) => ({type: 'setArticles', menu} as const)
}
export const getArticlesOfPage = (page: number): ThunkType => async (dispatch) => {
    const response = await menuAPI.getArticlesOfPage(page)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setArticles(response.data))
    }
}
import {baseThunkType, inferActionsType} from './../redux-store';
import {menuAPI} from "../../DAL/articles-api"
import {articleType} from "./reducer-types";
import {statusCodes} from "../../DAL/response-status-codes";


let initialState = {
    posts: [] as Array<articleType>,
    currentPage: 1,
    pageSize: 5,
    postsCount: null as number | null
}

type initialStateType = typeof initialState

export type actionsType = inferActionsType<typeof actions>

export const menuReducer = (state = initialState, action: actionsType): initialStateType => {
    let stateCopy = {...state}
    switch (action.type) {
        case 'setPosts':
            stateCopy.posts = [...state.posts]
            stateCopy.posts = action.posts
            return stateCopy
        case 'setPostsCount':
            stateCopy.postsCount = action.postsCount
            return stateCopy
        default:
            return stateCopy;
    }
}


export type thunkType = baseThunkType<actionsType>

const actions = {
    setPosts: (posts: Array<articleType>) => ({type: 'setPosts', posts} as const),
    setPostsCount: (postsCount: number) => ({type: 'setPostsCount', postsCount} as const)
}
export const getArticlesOfPage = (page: number): thunkType => async (dispatch) => {
    const response = await menuAPI.getArticlesOfPage(page)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setPosts(response.data.results))
        dispatch(actions.setPostsCount(response.data.count))
    }
}
import {statusCodes} from "../../DAL/response-status-codes";
import {ArticleType, BaseThunkType, InferActionsType, ProfileType} from "../common-types";
import {usersApi} from "../../DAL/users-api";


const initialState = {
    id: null as number | null,
    username: null as string | null,
    photo: null as string | null,
    articles: {
        articles: [] as Array<ArticleType>,
        count: 0
    },
    aboutMe: null as string | null
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'setUserProfile':
            return {...action.user}
        case 'setPhoto':
            return {...state,photo: action.photo}
        default:
            return state
    }
}

const actions = {
    setUserProfile: (user: ProfileType) => ({type: 'setUserProfile', user} as const),
    setPhoto: (photo:string) => ({type: 'setPhoto', photo} as const)
}

export type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

export const getUserProfile = (username: string, page: number): ThunkType => async (dispatch) => {
    const response = await usersApi.getUserInfoByUsername(username, page)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setUserProfile(response.data))
    }
}

export const setMyUserPhoto = (photo: File): ThunkType => async (dispatch) => {
    const response = await usersApi.setPhoto(photo)
    if (response.status === statusCodes.CREATED) {
        dispatch(actions.setPhoto(response.data.photo))
    }
}

export const setMyUserAboutMe = (username: string, text: string): ThunkType => async (dispatch) => {
    const response = await usersApi.setAboutMe(username, text)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setUserProfile(response.data))
    }
}
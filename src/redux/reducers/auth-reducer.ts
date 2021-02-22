import {InferActionsType, BaseThunkType} from '../common-types';
import {usersApi} from "../../DAL/users-api"
import {UserCredentialsType, UserType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";


const initialState = {
    id: null as number | null,
    isAuthenticated: false,
    username: null as string | null,
    photo: null as string | null
}

type InitialStateType = typeof initialState

export type ActionsType = InferActionsType<typeof actions>

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "setUserInfo":
            return {...action.user, isAuthenticated: true}

        case "deleteUserInfo":
            return {
                id: null,
                isAuthenticated: false,
                username: null,
                photo: null
            }
        default:
            return state
    }
}

const actions = {
    setUser: (user: UserType) => ({type: 'setUserInfo', user} as const),
    deleteUser: () => ({type: 'deleteUserInfo'} as const)
}


type ThunkType = BaseThunkType<ActionsType>

type ThunkTypeWithNumberReturn = BaseThunkType<ActionsType, number>


export const getUserInfo = (): ThunkType => async (dispatch) => {
    const response = await usersApi.getMyUserInfo()
    if (response.status === statusCodes.OK) {
        dispatch(actions.setUser(response.data))
    }
}

export const loginUser = (userCredentials: UserCredentialsType): ThunkTypeWithNumberReturn => async (dispatch) => {
    const response = await usersApi.loginUser(userCredentials)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setUser(response.data))
    }
    return response.status
}

export const logoutUser = (): ThunkType => async (dispatch) => {
    const response = (await usersApi.logoutUser())
    if (response.status === statusCodes.OK_NO_CONTENT) {
        dispatch(actions.deleteUser())
    }

}


export const signupUser = (credentials: UserCredentialsType): ThunkTypeWithNumberReturn => async (dispatch) => {
    const response = await usersApi.signupUser(credentials)
    return response.status
}
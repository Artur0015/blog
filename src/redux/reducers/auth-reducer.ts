import { inferActionsType, baseThunkType } from './../redux-store';
import { userAPI } from "../../DAL/user-api"
import {userCredentialsType, userType} from "./reducer-types";
import {statusCodes} from "../../DAL/response-status-codes";


let initialState = {isAuthenticated: false} as userType



export const authReducer = (state: userType = initialState, action: actionsType): userType => {
    let stateCopy = { ...state }
    switch (action.type) {
        case 'setUserInfo':
            stateCopy.isAuthenticated = action.user.isAuthenticated
            stateCopy.username = action.user.username
            stateCopy.photo = action.user.photo
            return stateCopy
        case 'deleteUserInfo':
            stateCopy.isAuthenticated = false
            stateCopy.username = null
            stateCopy.photo = null
            return stateCopy
        default:
            return stateCopy


    }
}

const actions = {
    setUser: (username: string | null, photo: string | null) => ({
        type: 'setUserInfo',
        user: { isAuthenticated: true, username, photo }
    } as const),
    deleteUser: () => ({ type: 'deleteUserInfo' } as const)
}

export type actionsType = inferActionsType<typeof actions>

type ThunkTypeWithNoReturn = baseThunkType<actionsType>

type thunkTypeWithNumberTypeReturn = baseThunkType<actionsType, number>

export const getUserInfo = (): ThunkTypeWithNoReturn => async (dispatch) => {
    const response = await userAPI.getUserInfo()
    if (response.status === statusCodes.OK){
        dispatch(actions.setUser(response.data.username, response.data.photo))
    }
}

export const loginUser = (userCredentials: userCredentialsType): thunkTypeWithNumberTypeReturn => async (dispatch) => {
    let response = await userAPI.loginUser(userCredentials)
    if (response.status === statusCodes.OK) {
        dispatch(actions.setUser(response.data.username, response.data.photo))
    }
    return response.status
}

export const logoutUser = (): ThunkTypeWithNoReturn => async (dispatch) => {
    let response = (await userAPI.logoutUser())
    if (response.status === statusCodes.OK) {
        dispatch(actions.deleteUser())
    }

}

export const signupUser = (credentials: userCredentialsType): thunkTypeWithNumberTypeReturn => async (dispatch) => {
    const response = await userAPI.signupUser(credentials)
    return response.status
}
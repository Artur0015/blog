import { inferActionsType, baseThunkType } from './../redux-store';
import { userAPI } from "../../DAL/user-api"
import {responseType, userCredentialsType, userType} from "./reducer-types";


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

type thunkTypeWithResponseTypeReturn = baseThunkType<actionsType, responseType>

export const getUserInfo = (): ThunkTypeWithNoReturn => async (dispatch) => {
    const user = await userAPI.getUserInfo()
    if (user.isAuthenticated) {
        dispatch(actions.setUser(user.username, user.photo))
    }

}

export const loginUser = (userCredentials: userCredentialsType): thunkTypeWithResponseTypeReturn => async (dispatch) => {
    let response = await userAPI.loginUser(userCredentials)
    if (response.detail === 'OK') {
        dispatch(getUserInfo())
    }
    return response
}

export const logoutUser = (): ThunkTypeWithNoReturn => async (dispatch) => {
    let response = (await userAPI.logoutUser())
    if (response.detail === 'OK') {
        dispatch(actions.deleteUser())
    }

}

export const signupUser = (credentials: userCredentialsType): thunkTypeWithResponseTypeReturn => async (dispatch) => {
    return userAPI.signupUser(credentials)
}
import {InferActionsType, BaseThunkType, BaseUserType} from '../common-types';
import {usersApi} from "../../DAL/users-api"
import {CredentialsType, UserType} from "../common-types";
import {statusCodes} from "../../DAL/response-status-codes";
import {LoginCredentialsType} from "../../components/login/login";
import {errorActions, ErrorActionsType} from "./error-reducer";
import errors from "../errors";


const initialState: UserType = {isAuthenticated: false}

export type ActionsType = InferActionsType<typeof actions>

export const authReducer = (state: UserType = initialState, action: ActionsType): UserType => {
    switch (action.type) {
        case "setUserInfo":
            return {...action.user, isAuthenticated: true}
        case "deleteUserInfo":
            return {isAuthenticated: false}
        default:
            return state
    }
}

const actions = {
    setUser: (user: BaseUserType) => ({type: 'setUserInfo', user} as const),
    deleteUser: () => ({type: 'deleteUserInfo'} as const)
}


type ThunkType = BaseThunkType<ActionsType | ErrorActionsType>

type ThunkTypeWithNumberReturn = BaseThunkType<ActionsType | ErrorActionsType, number>


export const getUserInfo = (): ThunkType => async (dispatch) => {
    const response = await usersApi.getMyUserInfo()
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setUser(response.data))
    } else if (!(response && response.status !== statusCodes.UNAUTHORIZED)) {
        dispatch(errorActions.setError(errors.userInfoPullFail))
    }
}

export const loginUser = (userCredentials: LoginCredentialsType): ThunkTypeWithNumberReturn => async (dispatch) => {
    const response = await usersApi.loginUser(userCredentials)
    if (response && response.status === statusCodes.OK) {
        dispatch(actions.setUser(response.data))
    } else if (!(response && response.status !== statusCodes.UNAUTHORIZED)) {
        dispatch(errorActions.setError(errors.credentialsCompareFail))
        return statusCodes.SERVER_ERROR
    }
    return response.status
}

export const logoutUser = (): ThunkType => async (dispatch) => {
    const response = (await usersApi.logoutUser())
    if (response && response.status === statusCodes.OK_NO_CONTENT) {
        dispatch(actions.deleteUser())
    } else {
        dispatch(errorActions.setError(errors.logoutFail))
    }
}


export const signupUser = (credentials: CredentialsType): ThunkTypeWithNumberReturn => async (dispatch) => {
    const response = await usersApi.signupUser(credentials)
    if (!(response && (response.status === statusCodes.CREATED || response.status === statusCodes.BAD_REQUEST))) {
        dispatch(errorActions.setError(errors.signupFail))
        return statusCodes.SERVER_ERROR
    }
    return response.status
}
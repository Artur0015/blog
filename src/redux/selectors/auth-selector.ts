import { AppStateType } from './../redux-store';


export const mstpGetAuthenticationStatus = (state: AppStateType) => state.authReducer.isAuthenticated

export const mstpGetUserUsername = (state: AppStateType) => state.authReducer.username

export const mstpGetUserPhoto = (state: AppStateType) => state.authReducer.photo
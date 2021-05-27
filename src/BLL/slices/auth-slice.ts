import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CredentialsType, BaseUserType, UserType} from "../../common-types";
import {usersApi} from "../../DAL/users-api";



export const getUserInfo = createAsyncThunk<void, void>(
    'auth/getUserInfo',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            if(!localStorage.getItem('token')) {
                return rejectWithValue(null)
            }
            const data = (await usersApi.getMyUserInfo()).data
            dispatch(authSlice.actions.setUser(data))
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const loginUser = createAsyncThunk<void, CredentialsType>(
    'auth/loginUser',
    async (credentials, {rejectWithValue, dispatch}) => {
        try {
            const data = (await usersApi.loginUser(credentials)).data
            localStorage.setItem('token', data.token)
            dispatch(authSlice.actions.setUser(data.user))
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const signupUser = createAsyncThunk<void, CredentialsType>(
    'auth/signupUser',
    async (credentials, {rejectWithValue}) => {
        try {
            await usersApi.signupUser(credentials)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {dispatch}) => {
        localStorage.removeItem('token')
        dispatch(authSlice.actions.deleteUser())
    }
)

const authSlice = createSlice({
        name: 'auth',
        initialState: {isAuthenticated: false} as UserType,
        reducers: {
            setUser: (state, {payload}: { payload: BaseUserType }) => {
                return {isAuthenticated: true, ...payload}
            },
            deleteUser: (state) => {
                return {isAuthenticated: false}
            }
        }
    }
)

export default authSlice
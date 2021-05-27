import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BaseUserType, UserSubscriptionsType} from "../../common-types";
import {usersApi} from "../../DAL/users-api";


export const getMySubscriptions = createAsyncThunk<Array<BaseUserType>, void>(
    'users/getMySubscriptions',
    async (_, {rejectWithValue}) => {
        try {
            return (await usersApi.getMySubscriptions()).data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const subscribeToUser = createAsyncThunk<void, string>(
    'profile/subscribe',
    async (username, {rejectWithValue, dispatch}) => {
        try {
            dispatch(usersSlice.actions.subscribeToUser(username))
            await usersApi.subscribe(username)
        } catch (e) {
            dispatch(usersSlice.actions.unsubscribeFromUser(username))
            return rejectWithValue(username)
        }
    }
)

export const unsubscribeFromUser = createAsyncThunk<void, string, { rejectValue: string }>(
    'profile/unsubscribe',
    async (username, {rejectWithValue, dispatch}) => {
        try {
            dispatch(usersSlice.actions.unsubscribeFromUser(username))
            await usersApi.unsubscribe(username)
        } catch (e) {
            dispatch(usersSlice.actions.subscribeToUser(username))
            return rejectWithValue(username)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: [] as Array<UserSubscriptionsType>,
    reducers: {
        subscribeToUser: (state, {payload}) => {
            const user = state.find((u) => u.username === payload)
            if(user) {
                user.isSubscribed = true
            }
        },
        unsubscribeFromUser: (state, {payload}) => {
            const user = state.find((u) => u.username === payload)
            if(user) {
                user.isSubscribed = false
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getMySubscriptions.fulfilled, (state, {payload}) => {
            return payload.map(u => ({...u, isSubscribed: true}))
        })
    }
})

export default usersSlice
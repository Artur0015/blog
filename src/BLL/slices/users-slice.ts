import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BaseUserType, UserSubscriptionsType} from "../../common-types";
import {usersApi} from "../../DAL/users-api";
import {subscribeToUser, unsubscribeFromUser} from "./profile-slice";


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

const usersSlice = createSlice({
    name: 'users',
    initialState: [] as Array<UserSubscriptionsType>,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMySubscriptions.fulfilled, (state, {payload}) => {
            return payload.map(u => ({...u, isSubscribed: true}))
        })
        builder.addCase(subscribeToUser.fulfilled, (state, {payload}) => {
            const user = state.find((u) => u.username === payload)
            if(user) {
                user.isSubscribed = true
            }
        })
        builder.addCase(unsubscribeFromUser.fulfilled, (state, {payload}) => {
            const user = state.find((u) => u.username === payload)
            if(user) {
                user.isSubscribed = false
            }
        })
    }
})

export default usersSlice
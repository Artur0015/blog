import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    FullUserType,
} from "../../common-types";
import {usersApi} from "../../DAL/users-api";


export const getUserByUsername = createAsyncThunk<FullUserType, string>(
    'profile/getUserByUsername',
    async (username, {rejectWithValue}) => {
        try {
            return (await usersApi.getUserInfoByUsername(username)).data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const changeUserAboutMe = createAsyncThunk<string, string>(
    'profile/changeUserAboutMe',
    async (aboutMe, {rejectWithValue}) => {
        try {
            await usersApi.changeUserAboutMe(aboutMe)
            return aboutMe
        } catch
            (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const changeUserPhoto = createAsyncThunk<string, File>(
    'profile/chaneUserPhoto',
    async (photo, {rejectWithValue}) => {
        try {
            return (await usersApi.changeUserPhoto(photo)).data.photo
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const subscribeToUser = createAsyncThunk<void, string>(
    'profile/subscribe',
    async (username, {rejectWithValue, dispatch}) => {
        try {
            dispatch(profileSlice.actions.subscribeToUser())
            await usersApi.subscribe(username)
        } catch (e) {
            dispatch(profileSlice.actions.unsubscribeFromUser())
            return rejectWithValue(username)
        }
    }
)

export const unsubscribeFromUser = createAsyncThunk<void, string>(
    'profile/unsubscribe',
    async (username, {rejectWithValue, dispatch}) => {
        try {
            dispatch(profileSlice.actions.unsubscribeFromUser())
            await usersApi.unsubscribe(username)
        } catch (e) {
            dispatch(profileSlice.actions.subscribeToUser())
            return rejectWithValue(username)
        }
    }
)

const profileSlice = createSlice({
        name: 'profile',
        initialState: {} as FullUserType,
        reducers: {
            subscribeToUser: (state) => {
                state.subscribers += 1
                state.isSubscribed = true
            },
            unsubscribeFromUser: (state) => {
                state.subscribers -= 1
                state.isSubscribed = false
            }
        },
        extraReducers: builder => {
            builder.addCase(getUserByUsername.fulfilled, (state, {payload}) => payload)
            builder.addCase(changeUserAboutMe.fulfilled, (state, {payload}) => {
                state.aboutMe = payload
            })
            builder.addCase(changeUserPhoto.fulfilled, (state, {payload}) => {
                state.photo = payload
            })
        }
    }
)

export default profileSlice
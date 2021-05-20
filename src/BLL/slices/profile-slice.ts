import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ArticleRequestParamsType,
    ArticlesWithCountType,
    FullUserType,
    ProfileType,
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

export const getUserArticlesByUsername = createAsyncThunk<ArticlesWithCountType, { username: string, requestParams: ArticleRequestParamsType }>(
    'profile/getUserArticlesByUsername',
    async ({username, requestParams}, {rejectWithValue}) => {
        try {
            return (await usersApi.getUserArticlesByUsername(username, requestParams)).data
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

export const subscribeToUser = createAsyncThunk<string, string>(
    'profile/subscribe',
    async (username, {rejectWithValue}) => {
        try {
            await usersApi.subscribe(username)
            return username
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const unsubscribeFromUser = createAsyncThunk<string, string>(
    'profile/unsubscribe',
    async (username, {rejectWithValue}) => {
        try {
            await usersApi.unsubscribe(username)
            return username
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const profileSlice = createSlice({
        name: 'profile',
        initialState: {} as ProfileType,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getUserArticlesByUsername.fulfilled, (state, {payload}) => {
                state.articles = payload
            })
            builder.addCase(getUserByUsername.fulfilled, (state, {payload}) => ({...payload, articles: state.articles}))
            builder.addCase(subscribeToUser.fulfilled, (state, {payload}) => {
                if (payload === state.username) {
                    state.isSubscribed = true
                    state.subscribers += 1
                }
            })
            builder.addCase(unsubscribeFromUser.fulfilled, (state, {payload}) => {
                if (payload === state.username) {
                    state.isSubscribed = false
                    state.subscribers -= 1
                }
            })
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
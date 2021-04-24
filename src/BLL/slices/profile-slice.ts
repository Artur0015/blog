import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ArticleRequestParamsType,
    ArticlesWithCountType,
    FullUserType,
    ProfileType,
    UserEditableFieldsType
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

export const changeUser = createAsyncThunk<void, UserEditableFieldsType>(
    'profile/changeUser',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const possiblePhoto = (await usersApi.changeUser(data)).data.photo // if user's photo is changed
            if (possiblePhoto) dispatch(profileSlice.actions.setUserPhoto(possiblePhoto))
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const profileSlice = createSlice({
        name: 'profile',
        initialState: {} as ProfileType,
        reducers: {
            setUserPhoto: (state, {payload}: { payload: string }) => {
                state.photo = payload
            }
        },
        extraReducers: builder => {
            builder.addCase(getUserArticlesByUsername.fulfilled, (state, {payload}) => {
                state.articles = payload
            })
            builder.addCase(getUserByUsername.fulfilled, (state, {payload}) => ({...payload, articles: state.articles}))
        }
    }
)

export default profileSlice
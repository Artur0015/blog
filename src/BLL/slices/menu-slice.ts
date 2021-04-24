import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleRequestParamsType, ArticlesWithCountType} from "../../common-types";
import {articlesAPI} from "../../DAL/articles-api";

export const getArticlesOfPage = createAsyncThunk<ArticlesWithCountType, ArticleRequestParamsType>(
    'menu/getArticlesOfPage',
    async (requestParams, {rejectWithValue}) => {
        try{
            return (await articlesAPI.getArticlesOfPage(requestParams)).data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        articles: {} as ArticlesWithCountType
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getArticlesOfPage.fulfilled, (state, {payload}) => {
            state.articles = payload
        })
    }
})

export default menuSlice
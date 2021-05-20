import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleRequestParamsType, ArticlesWithCountType} from "../../common-types";
import {articlesAPI} from "../../DAL/articles-api";

export const getArticlesOfPage = createAsyncThunk<void, ArticleRequestParamsType>(
    'menu/getArticlesOfPage',
    async (requestParams, {rejectWithValue, dispatch}) => {
        try{
            dispatch(menuSlice.actions.setArticles((await articlesAPI.getArticlesOfPage(requestParams)).data))
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const getSubscribedArticles = createAsyncThunk<void, ArticleRequestParamsType>(
    'menu/getSubscribedArticles',
    async (requestParams, {rejectWithValue, dispatch}) => {
        try{
             dispatch(menuSlice.actions.setArticles((await articlesAPI.getSubscribedArticles(requestParams)).data))
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState: {} as ArticlesWithCountType,
    reducers: {
        setArticles: (state, {payload}) => payload
    },
})

export default menuSlice
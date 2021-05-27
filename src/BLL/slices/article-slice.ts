import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleBodyType, CreateSuccessResponseType, CommentType, FullArticleType} from "../../common-types";
import {articlesAPI} from "../../DAL/articles-api";
import {RootStateType} from "../store";

export const getArticle = createAsyncThunk<FullArticleType, number>(
    'article-main-page-UI/getArticle',
    async (id, {rejectWithValue}) => {
        try {
            return (await articlesAPI.getArticle(id)).data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const getArticleComments = createAsyncThunk<Array<CommentType>, number>(
    'article-main-page-UI/getArticleComments',
    async (articleId, {rejectWithValue}) => {
        try {
            return (await articlesAPI.getArticleComments(articleId)).data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const addComment = createAsyncThunk<CommentType, { articleId: number, text: string }, { state: RootStateType }>(
    'article-main-page-UI/addComment',
    async ({articleId, text}, {rejectWithValue, getState}) => {
        try {
            const {id} = (await articlesAPI.addComment(articleId, text)).data
            const author = getState().auth
            const pubDate = new Date().toString()
            if (author.isAuthenticated) return {text, pubDate, author, id} // checking only for typescript
            return rejectWithValue(null)  // won't get here(error will be thrown from server if user is not authenticated)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const addArticle = createAsyncThunk<CreateSuccessResponseType, ArticleBodyType>(
    'article-main-page-UI/addArticle',
    async (article, {rejectWithValue}) => {
        try {
            return (await articlesAPI.addArticle(article)).data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const changeArticle = createAsyncThunk<ArticleBodyType, { id: number, article: ArticleBodyType }>(
    'article-main-page-UI/changeArticle',
    async ({id, article}, {rejectWithValue}) => {
        try {
            await articlesAPI.changeArticle(id, article)
            return article
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteArticle = createAsyncThunk<void, number>(
    'article-main-page-UI/deleteArticle',
    async (id, {rejectWithValue}) => {
        try {
            await articlesAPI.deleteArticle(id)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteComment = createAsyncThunk<number, number>(
    'article-main-page-UI/deleteComment',
    async (id, {rejectWithValue}) => {
        try {
            await articlesAPI.deleteComment(id)
            return id
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

type ChangedCommentType = { id: number, text: string }

export const changeComment = createAsyncThunk<ChangedCommentType, ChangedCommentType>(
    'article-main-page-UI/changeComment',
    async ({id, text}, {rejectWithValue}) => {
        try {
            await articlesAPI.changeComment(id, text)
            return {id, text}
        } catch (e) {
            return rejectWithValue(e.reponse.data)
        }
    }
)

export const putLike = createAsyncThunk<void, number>(
    'article-main-page-UI/putLike',
    async (articleId, {rejectWithValue, dispatch}) => {
        try {
            dispatch(articleSlice.actions.putLike())
            await articlesAPI.putLike(articleId)
        } catch (e) {
            dispatch(articleSlice.actions.deleteLike())
            return rejectWithValue(e.response.data)
        }
    }
)

export const putDislike = createAsyncThunk<void, number>(
    'article-main-page-UI/putDislike',
    async (articleId, {rejectWithValue, dispatch}) => {
        try {
            dispatch(articleSlice.actions.putDislike())
            await articlesAPI.putDislike(articleId)
        } catch (e) {
            dispatch(articleSlice.actions.deleteDislike())
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteLike = createAsyncThunk<void, number>(
    'article-main-page-UI/deleteLike',
    async (articleId, {rejectWithValue, dispatch}) => {
        try {
            dispatch(articleSlice.actions.deleteLike())
            await articlesAPI.deleteLike(articleId)
        } catch (e) {
            dispatch(articleSlice.actions.putLike())
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteDislike = createAsyncThunk<void, number>(
    'article-main-page-UI/deleteDislike',
    async (articleId, {rejectWithValue, dispatch}) => {
        try {
            dispatch(articleSlice.actions.deleteDislike())
            await articlesAPI.deleteDislike(articleId)
        } catch (e) {
            dispatch(articleSlice.actions.putDislike())
            return rejectWithValue(e.response.data)
        }
    }
)

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        article: {} as FullArticleType,
        comments: [] as Array<CommentType>
    },
    reducers: {
        putLike: ({article}) => {
            article.isLiked = true
            article.likes += 1
            if (article.isDisliked) {
                article.isDisliked = false
                article.dislikes -= 1
            }
        },
        putDislike: ({article}) => {
            article.isDisliked = true
            article.dislikes += 1
            if (article.isLiked) {
                article.isLiked = false
                article.likes -= 1
            }
        },
        deleteLike: ({article}) => {
            article.isLiked = false
            article.likes -= 1
        },
        deleteDislike: ({article}) => {
            article.isDisliked = false
            article.dislikes -= 1
        }
    },
    extraReducers: builder => {
        builder.addCase(getArticle.fulfilled, (state, {payload}) => {
            state.article = payload
        })
        builder.addCase(getArticleComments.fulfilled, (state, {payload}) => {
            state.comments = payload
        })
        builder.addCase(addComment.fulfilled, (state, {payload}) => {
            state.comments.unshift(payload)
        })
        builder.addCase(deleteComment.fulfilled, (state, {payload}) => {
            state.comments = state.comments.filter(c => c.id !== payload)
        })
        builder.addCase(changeComment.fulfilled, (state, {payload}) => {
            const comment = state.comments.find(c => c.id === payload.id)
            if (comment) comment.text = payload.text
        })
        builder.addCase(changeArticle.fulfilled, (state, {payload}) => {
            state.article.header = payload.header
            state.article.text = payload.text
        })

    }
})

export default articleSlice
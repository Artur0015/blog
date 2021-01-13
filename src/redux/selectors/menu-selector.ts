import { AppStateType } from './../redux-store';


export const mstpGetPosts = (state: AppStateType) => state.menuReducer.posts

export const mstpGetPageSize = (state: AppStateType) => state.menuReducer.pageSize

export const mstpGetPostsCount = (state: AppStateType) => state.menuReducer.postsCount
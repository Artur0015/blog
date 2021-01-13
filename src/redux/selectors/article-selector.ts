import { AppStateType } from './../redux-store';


export const mstpGetArticle = (state: AppStateType) => (state.articleReducer.article)

export const mstpGetComments = (state: AppStateType) => (state.articleReducer.comments)
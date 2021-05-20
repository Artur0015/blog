import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import menuSlice from "./slices/menu-slice";
import articlesSlice from "./slices/article-slice";
import profileSlice from "./slices/profile-slice";
import authSlice from "./slices/auth-slice";
import usersSlice from "./slices/users-slice";

const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        articlePage: articlesSlice.reducer,
        profile: profileSlice.reducer,
        auth: authSlice.reducer,
        users: usersSlice.reducer
    },
    devTools: process.env.NODE_ENV === 'development'
})

export type RootStateType = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
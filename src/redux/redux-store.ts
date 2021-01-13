import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { articleReducer } from "./reducers/article-reducer";
import { authReducer } from "./reducers/auth-reducer";
import { menuReducer } from "./reducers/menu-reducer";
import {Action} from "redux";

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");


let reducers = combineReducers(
    {
        menuReducer,
        articleReducer,
        authReducer,
    }
)

type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>

export type baseThunkType<A extends Action, R = void, C = unknown> = ThunkAction<Promise<R>, AppStateType, C, A>

type propertiesType<T> = T extends { [key: string]: infer U } ? U : never


export type inferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<propertiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


// @ts-ignore
window.store = store

export default store

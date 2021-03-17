import thunkMiddleware from 'redux-thunk'
import {articleReducer} from "./reducers/article-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {menuReducer} from "./reducers/menu-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {errorReducer} from "./reducers/error-reducer";

const {createStore, combineReducers, applyMiddleware, compose} = require("redux");

const reducers = combineReducers(
    {
        menuReducer,
        articleReducer,
        authReducer,
        profileReducer,
        errorReducer
    }
)
type RootReducersType = typeof reducers

export type AppStateType = ReturnType<RootReducersType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


// @ts-ignore
window.store = store

export default store

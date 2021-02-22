import thunkMiddleware from 'redux-thunk'
import {articleReducer} from "./reducers/article-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {menuReducer} from "./reducers/menu-reducer";
import {profileReducer} from "./reducers/profile-reducer";

const {createStore, combineReducers, applyMiddleware, compose} = require("redux");

let reducers = combineReducers(
    {
        menuReducer,
        articleReducer,
        authReducer,
        profileReducer
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

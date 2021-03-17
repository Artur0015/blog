import './App.css';
import {Route, Switch} from 'react-router-dom';
import './index.css'
import Write from './components/write/write';
import Menu from './components/menu/menu';
import ArticlePage from './components/article/article-page';
import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import React, {useEffect, useState} from "react";
import Profile from "./components/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import {DispatchType, UserType} from "./redux/common-types";
import {ActionsType, getUserInfo} from "./redux/reducers/auth-reducer";
import {getCurrentUserSelector, getError} from "./redux/selectors";
import Preloader from "./components/preloader/preloader";
import {errorActions, ErrorActionsType} from "./redux/reducers/error-reducer";
import {Alert} from "@material-ui/lab";
import {AppStateType} from "./redux/redux-store";
import Error from './components/error/error'

function App() {

    const [isLoading, setLoading] = useState(true)


    const dispatch = useDispatch<DispatchType<ActionsType | ErrorActionsType>>()
    const user = useSelector<AppStateType, UserType>(getCurrentUserSelector)
    const error = useSelector<AppStateType, string>(getError)


    useEffect(() => {
        setLoading(true)
        dispatch(getUserInfo()).then(() => setLoading(false))
    }, [])

    if (isLoading) {
        return <Preloader/>
    }

    if (error) {
        setTimeout(() => dispatch(errorActions.deleteError()), 8000)
    }

    return (<>
        {!!error
            ? <Alert variant="filled" severity="error" className={'errorAlert'}>{error}</Alert>
            : <Navbar/>}
        <Switch>
            <Route exact path='/'><Menu/></Route>
            <Route path='/article/:articleId'><ArticlePage/></Route>
            <Route path='/profile/:username'><Profile/></Route>
            {user.isAuthenticated
                ? <Route exact path='/write'><Write/></Route>
                : <><Route exact path='/login'><Login/></Route>
                    <Route exact path='/signup'><Signup/></Route></>
            }
            <Error />
        </Switch>
    </>)
}

export default App;
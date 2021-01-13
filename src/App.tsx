import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.css'
import WriteContainer from './components/write/write-container';
import { MenuContainer } from './components/menu/menu/menu-container';
import { ArticleContainer } from './components/article/article-container';
import { NavigationContainerConnecter } from './components/navigation/navigtaion-container';
import LoginContainer from './components/login/login-container';
import SignupContainer from './components/signup/signup-container';
import {AppStateType} from "./redux/redux-store";
import React from "react";



// Main App
function App(props: AppStateType) {
        return (<>
                <NavigationContainerConnecter />
                <Switch>
                        <Route exact path='/menu'><MenuContainer /></Route>
                        <Route exact path='/write'><WriteContainer /></Route>
                        <Route path='/article/:articleId'><ArticleContainer /></Route>
                        <Route exact path='/login'><LoginContainer /></Route>
                        <Route exact path='/signup'><SignupContainer /></Route>
                        <Redirect exact from='/' to='/menu' />
                </Switch>
        </>)
}



export default App;
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.css'
import Write from './components/write/write-container';
import MenuContainer from './components/menu/menu-container';
import ArticleContainer  from './components/article/article-container';
import NavigationContainer from './components/navigation/navigtaion-container';
import LoginContainer from './components/login/login-container';
import SignupContainer from './components/signup/signup-container';
import React from "react";


function App() {
        return (<>
                <NavigationContainer />
                <Switch>
                        <Route exact path='/menu'><MenuContainer /></Route>
                        <Route exact path='/write'><Write /></Route>
                        <Route path='/article/:articleId'><ArticleContainer /></Route>
                        <Route exact path='/login'><LoginContainer /></Route>
                        <Route exact path='/signup'><SignupContainer /></Route>
                        <Redirect exact from='/' to='/menu' />
                </Switch>
        </>)
}

export default App;
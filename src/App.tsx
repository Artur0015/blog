import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.css'
import Write from './components/write/write';
import Menu from './components/menu/menu';
import ArticleContainer  from './components/article/article-container';
import NavigationContainer from './components/navbar/navbar';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import React from "react";
import Error from "./components/error/error";
import Profile from "./components/profile/profile";


function App() {
        return (<>
                <NavigationContainer />
                <Switch>
                        <Route exact path='/menu'><Menu /></Route>
                        <Route exact path='/write'><Write /></Route>
                        <Route path='/article/:articleId'><ArticleContainer /></Route>
                        <Route path='/profile/:username'><Profile /></Route>
                        <Route exact path='/login'><Login /></Route>
                        <Route exact path='/signup'><Signup /></Route>
                        <Redirect exact from='/' to='/menu' />
                        <Route><Error /></Route>
                </Switch>
        </>)
}

export default App;
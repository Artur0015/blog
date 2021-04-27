import {Route, Switch} from 'react-router-dom';
import './index.css'
import './App.css'
import WriteNewArticle from './UI/article-components/write-new-article/WriteNewArticle';
import ArticlesMenu from './UI/article-components/articles-menu/ArticlesMenu';
import ArticleMainPage from './UI/article-components/article-main-page/ArticleMainPage';
import Navbar from './UI/navbar/Navbar';
import Login from './UI/auth/Login';
import Signup from './UI/auth/Signup';
import React, {useEffect, useState} from "react";
import Profile from "./UI/profile/Profile";
import Preloader from "./UI/tools/preloader/Preloader";
import {useAppDispatch} from "./BLL/store";
import Error from './UI/tools/error/Error'
import {getUserInfo} from "./BLL/slices/auth-slice";
import './UI/tools/usefull-styles.scss'


function App() {
    const [isLoading, setLoading] = useState(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setLoading(true)
        dispatch(getUserInfo()).then(() => setLoading(false))
    }, [dispatch])

    if (isLoading) {
        return <Preloader/>
    }

    return (<>
        <Navbar/>
        <Switch>
            <Route exact path='/'><ArticlesMenu/></Route>
            <Route path='/article/:articleId'><ArticleMainPage/></Route>
            <Route path='/profile/:username'><Profile/></Route>
            <Route exact path='/write'><WriteNewArticle/></Route>
            <Route exact path='/login'><Login/></Route>
            <Route exact path='/signup'><Signup/></Route>
            <Route><Error/></Route>
        </Switch>
    </>)
}

export default App;
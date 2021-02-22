import {useDispatch, useSelector} from 'react-redux'
import {ActionsType, getArticlesOfPage} from '../../redux/reducers/menu-reducer'
import React, {useEffect, useState} from 'react'
import Preloader from '../preloader/preloader'
import {useLocation} from 'react-router-dom'
import {DispatchType} from '../../redux/common-types'
import Post from "./post";
import {ArticleType} from "../../redux/common-types";
import Paginator from "./paginator";
import {getArticlesCountSelector, getArticlesOfCurrentPageSelector} from "../../redux/selectors";
import Error from "../error/error";


function Menu() {
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const articles = useSelector(getArticlesOfCurrentPageSelector)
    const articlesCount = useSelector(getArticlesCountSelector)
    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1

    useEffect(() => {
        setLoading(true)
        dispatch(getArticlesOfPage(currentPage)).then(() => {
            setLoading(false)
        })
    }, [currentPage])

    if(isLoading) {
        return <Preloader />
    }

    if(!articlesCount) {
        return <Error />
    }

    return <>
            {articles.map((article: ArticleType) =>
                <Post key={article.id} article={article}/>)}
            <Paginator currentPage={currentPage} count={articlesCount} pageSize={5}/>
        </>
}

export default Menu
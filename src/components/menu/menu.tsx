import {useDispatch, useSelector} from 'react-redux'
import {ActionsType, getArticlesOfPage} from '../../redux/reducers/menu-reducer'
import React, {useEffect, useState} from 'react'
import Preloader from '../preloader/preloader'
import {useLocation} from 'react-router-dom'
import {DispatchType} from '../../redux/common-types'
import {
    getArticlesCountSelector,
    getArticlesOfCurrentPageSelector
} from "../../redux/selectors";
import Error from "../error/error";
import PageOfArticles from "./page-of-articles";


function Menu() {
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1

    const articles = useSelector(getArticlesOfCurrentPageSelector)
    const articlesCount = useSelector(getArticlesCountSelector)

    useEffect(() => {
        setLoading(true)
        dispatch(getArticlesOfPage(currentPage)).then(() => {
            setLoading(false)
        })
    }, [currentPage])

    if (isLoading) {
        return <Preloader/>
    }

    if (!articlesCount) {
        return <Error/>
    }

    return <PageOfArticles withDelete={false} withUsername={true} articles={articles} articlesCount={articlesCount}
                           currentPage={currentPage}/>
}

export default Menu
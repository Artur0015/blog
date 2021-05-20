import {useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import Preloader from '../../tools/preloader/Preloader'
import {useLocation} from 'react-router-dom'
import {
    articlesCountSelector,
    articlesOfCurrentPageSelector
} from "../../../BLL/selectors";
import Error from "../../tools/error/Error";
import Articles from "./Articles";
import {useAppDispatch} from "../../../BLL/store";
import {getArticlesOfPage} from "../../../BLL/slices/menu-slice";
import {unwrapResult} from "@reduxjs/toolkit";


function ArticlesMenu() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    const currentPage = Number((useLocation().search.match(/\?page=\d{1,}/) || [])[0]?.slice(6)) || 1
    const pageSize = 6

    const dispatch = useAppDispatch()
    const articles = useSelector(articlesOfCurrentPageSelector)
    const articlesCount = useSelector(articlesCountSelector)
    useEffect(() => {
        if (!isLoading) {
            setLoading(true)
        }
        dispatch(getArticlesOfPage({currentPage, pageSize}))
            .then(unwrapResult)
            .catch(() => setError(true))
            .then(() => setLoading(false))
    }, [currentPage])

    if (isLoading) return <Preloader/>
    if (isError) return <Error/>

    return <Articles withUsername={true} articles={articles}
                     totalPages={Math.ceil(articlesCount / pageSize)}
                     currentPage={currentPage}/>
}

export default ArticlesMenu
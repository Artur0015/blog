import {useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import Preloader from '../../tools/preloader/Preloader'
import {useLocation} from 'react-router-dom'
import {
    getArticlesCountSelector,
    getArticlesOfCurrentPageSelector
} from "../../../BLL/selectors";
import Error from "../../tools/error/Error";
import Articles from "./Articles";
import {useAppDispatch} from "../../../BLL/store";
import {getArticlesOfPage} from "../../../BLL/slices/menu-slice";


function ArticlesMenu() {
    const [isLoading, setLoading] = useState(true)

    const currentPage = Number((useLocation().search.match(/\?page=\d{1,}/) || [])[0]?.slice(6)) || 1
    const pageSize = 6

    const dispatch = useAppDispatch()
    const articles = useSelector(getArticlesOfCurrentPageSelector)
    const articlesCount = useSelector(getArticlesCountSelector)

    useEffect(() => {
        setLoading(true)
        dispatch(getArticlesOfPage({currentPage, pageSize})).then(() => setLoading(false))
    }, [currentPage])

    if (isLoading) {
        return <Preloader/>
    }

    if (!articlesCount) {
        return <Error/>
    }

    return <Articles withUsername={true} articles={articles}
                     totalPages={Math.ceil(articlesCount / pageSize)}
                     currentPage={currentPage}/>
}

export default ArticlesMenu
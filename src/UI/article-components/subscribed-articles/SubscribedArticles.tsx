import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../BLL/store";
import {useSelector} from "react-redux";
import {
    articlesCountSelector,
    articlesOfCurrentPageSelector, currentUserSelector
} from "../../../BLL/selectors";
import {Redirect, useLocation} from "react-router-dom";
import {getSubscribedArticles} from "../../../BLL/slices/menu-slice";
import Preloader from "../../tools/preloader/Preloader";
import Articles from "../articles-menu/Articles";
import {unwrapResult} from "@reduxjs/toolkit";
import Error from "../../tools/error/Error";

function SubscribedArticles() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    const currentPage = Number((useLocation().search.match(/\?page=\d{1,}/) || [])[0]?.slice(6)) || 1
    const pageSize = 6

    const dispatch = useAppDispatch()
    const {isAuthenticated} = useSelector(currentUserSelector)
    const articles = useSelector(articlesOfCurrentPageSelector)
    const articlesCount = useSelector(articlesCountSelector)

    useEffect(() => {
        dispatch(getSubscribedArticles({currentPage, pageSize}))
            .then(unwrapResult)
            .catch(() => setError(true))
            .then(() => setLoading(false))
    }, [currentPage])

    if (!isAuthenticated) return <Redirect to={'/'}/>
    if (isLoading) return <Preloader/>
    if (isError) return <Error/>

    return <Articles articles={articles} totalPages={Math.ceil(articlesCount / pageSize)} currentPage={currentPage}
                     withUsername={true}/>
}

export default SubscribedArticles
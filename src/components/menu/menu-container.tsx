import {useDispatch, useSelector} from 'react-redux'
import {actionsType, getArticlesOfPage} from '../../redux/reducers/menu-reducer'
import React, {useEffect, useState} from 'react'
import Preloader from '../preloader/preloader'
import {mstpGetPageSize, mstpGetPosts, mstpGetPostsCount} from '../../redux/selectors/menu-selector'
import {useLocation} from 'react-router-dom'
import {dispatchType} from '../../redux/redux-store'
import Post from "./post";
import {articleType} from "../../redux/reducers/reducer-types";
import Paginator from "./paginator";


function MenuContainer() {
    let [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch<dispatchType<actionsType>>()
    const posts = useSelector(mstpGetPosts)
    const pageSize = useSelector(mstpGetPageSize)
    const postsCount = useSelector(mstpGetPostsCount)
    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1

    useEffect(() => {
        setLoading(true)
        dispatch(getArticlesOfPage(currentPage)).then(() => {
            setLoading(false)
        })
    }, [currentPage])

    return isLoading
        ? <Preloader/>
        : <>
            {posts.map((article: articleType, index: number) =>
                <Post key={index} id={article.id} header={article.header} text={article.text} author={article.author} />)}
            <Paginator currentPage={currentPage} postsCount={postsCount} pageSize={pageSize} />
        </>
}

export default MenuContainer
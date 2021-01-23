import {
    actionsType,
    addComment,
    changeArticle,
    getArticle,
    getArticleComments
} from "../../redux/reducers/article-reducer"
import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Article from "./article"
import Comments from "./comments"
import Preloader from "../preloader/preloader"
import {mstpGetArticle, mstpGetComments} from "../../redux/selectors/article-selector"
import {mstpGetUserUsername, mstpGetAuthenticationStatus} from "../../redux/selectors/auth-selector"
import {dispatchType} from "../../redux/redux-store"
import {useDispatch, useSelector} from "react-redux";
import {articleType} from "../../redux/reducers/reducer-types";


function ArticleContainer() {
    let [isLoadingArticle, setArticleLoading] = useState(false)
    let [areLoadingComments, setCommentsLoading] = useState(false)

    const dispatch: dispatchType<actionsType> = useDispatch()
    const articleId = Number(useParams<{ articleId: string }>().articleId)
    const article = useSelector(mstpGetArticle)
    const comments = useSelector(mstpGetComments)
    const isAuthenticated = useSelector(mstpGetAuthenticationStatus)

    useEffect(() => {
        setArticleLoading(true)
        setCommentsLoading(true);
        dispatch(getArticle(articleId)).then(() => {
            setArticleLoading(false)
        })
        dispatch(getArticleComments(articleId)).then(() => {
            setCommentsLoading(false)
        })
    }, [])


    function handleCommentAddButtonClick(commentText: string) {
        dispatch(addComment(articleId, commentText))
    }

    function handleArticleSave(article: articleType) {
        dispatch(changeArticle({...article, id: articleId}))
    }

    return <div>{isLoadingArticle
        ? <Preloader/>
        : <Article article={article} changeArticle={handleArticleSave}/>}
        {areLoadingComments
            ? <Preloader/>
            : <><Comments comments={comments} handleClick={handleCommentAddButtonClick}
                          isAuthenticated={isAuthenticated}/>
            </>}
    </div>
}

export default ArticleContainer
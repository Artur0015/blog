import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Article from "./article/Article"
import Preloader from "../../tools/preloader/Preloader"
import {ArticleBodyType} from "../../../common-types"
import {useSelector} from "react-redux";
import {articleCommentsSelector, articleSelector, currentUserSelector} from "../../../BLL/selectors";
import {useAppDispatch} from "../../../BLL/store";
import {
    addComment,
    changeArticle, changeComment, deleteArticle,
    deleteComment, deleteDislike,
    deleteLike,
    getArticle,
    getArticleComments, putDislike, putLike
} from "../../../BLL/slices/article-slice";
import articleStyles from "./article/article.module.scss";
import commentStyles from './comments/comment.module.scss'
import CommentInput from "./comments/CommentInput";
import Comment from "./comments/Comment";
import Error from "../../tools/error/Error";
import {useHistory} from "react-router";
import {unwrapResult} from "@reduxjs/toolkit";


function ArticleMainPage() {
    const [isLoadingArticle, setLoadingArticle] = useState(true)
    const [areLoadingComments, setLoadingComments] = useState(true)
    const [isError, setError] = useState(false)

    const id = Number(useParams<{ articleId: string }>().articleId)

    const history = useHistory()

    const dispatch = useAppDispatch()
    const article = useSelector(articleSelector)
    const comments = useSelector(articleCommentsSelector)
    const user = useSelector(currentUserSelector)

    useEffect(() => {
        dispatch(getArticle(id))
            .then(unwrapResult)
            .catch(() => setError(true))
            .then(() => setLoadingArticle(false))
        dispatch(getArticleComments(id)).finally(() => setLoadingComments(false))
    }, [id])

    function handleArticleDelete() {
        setLoadingArticle(true)
        dispatch(deleteArticle(article.id)).finally(() => {
            history.push('/')
        })

    }

    function handleCommentAdd(text: string) {
        dispatch(addComment({articleId: id, text}))
    }

    const handleDeleteComment = useCallback((id: number) => {
        dispatch(deleteComment(id))
    }, [])

    const handleCommentChange = useCallback((id: number, text: string) => {
        dispatch(changeComment({id, text}))
    }, [])

    function toggleLike() {
        if (user.isAuthenticated) {
            if (article.isLiked) dispatch(deleteLike(article.id))
            else dispatch(putLike(article.id))
        }
    }

    function toggleDislike() {
        if (user.isAuthenticated) {
            if (article.isDisliked) dispatch(deleteDislike(article.id))
            else dispatch(putDislike(article.id))
        }
    }

    function saveArticleChanges(changedArticle: ArticleBodyType) {
        dispatch(changeArticle({id: article.id, article: changedArticle}))
    }

    if (isLoadingArticle) return <Preloader/>
    if (isError) return <Error/>

    return <div className={articleStyles.main}>
        <Article article={article} changeArticle={saveArticleChanges} user={user} toggleLike={toggleLike}
                 toggleDislike={toggleDislike} deleteArticle={handleArticleDelete}/>
        {user.isAuthenticated && <CommentInput addComment={handleCommentAdd}/>}
        {areLoadingComments
            ? <div style={{textAlign: 'center'}}><Preloader notInCenter/></div>
            : <div className={commentStyles.comments}>
                {comments.length !== 0
                    ? <><h3>Comments</h3>
                        {comments.map(c => <Comment key={c.id} comment={c} changeComment={handleCommentChange}
                                                    isOwner={user.isAuthenticated && c.author.username === user.username}
                                                    deleteComment={handleDeleteComment}/>)}</>
                    : <h3>No Comments</h3>}
            </div>}
    </div>
}

export default ArticleMainPage
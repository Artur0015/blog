import {
    ActionsType,
    addComment,
    changeArticle, deleteComment, deleteDislike, deleteLike,
    getArticle,
    getArticleComments, putDislike, putLike
} from "../../redux/reducers/article-reducer"
import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Article from "./article-page/article"
import Comments from "./comments/comments"
import Preloader from "../preloader/preloader"
import {ArticleBodyType, DispatchType} from "../../redux/common-types"
import {useDispatch, useSelector} from "react-redux";
import {getArticleCommentsSelector, getArticleSelector, getCurrentUserSelector} from "../../redux/selectors";
import Error from "../error/error";


function ArticlePage() {
    const [isLoadingArticle, setLoadingArticle] = useState(true)
    const [areLoadingComments, setLoadingComments] = useState(true)

    const dispatch: DispatchType<ActionsType> = useDispatch()
    const articleId = Number(useParams<{ articleId: string }>().articleId)

    const article = useSelector(getArticleSelector)
    const comments = useSelector(getArticleCommentsSelector)
    const user = useSelector(getCurrentUserSelector)

    useEffect(() => {
        dispatch(getArticle(articleId)).then(() => setLoadingArticle(false))
        dispatch(getArticleComments(articleId)).then(() => setLoadingComments(false))
    }, [articleId])


    function handleCommentAdd(commentText: string) {
        dispatch(addComment(articleId, commentText))
    }

    function handleDeleteComment(commentId: number) {
        dispatch(deleteComment(commentId))
    }

    function handleArticleSave(article: ArticleBodyType) {
        dispatch(changeArticle(articleId, article))
    }

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

    if (isLoadingArticle) {
        return <Preloader/>
    }

    if (!article.id) {
        return <Error/>
    }

    return <div>
        <Article article={article} changeArticle={handleArticleSave} user={user} toggleLike={toggleLike}
                 toggleDislike={toggleDislike}/>
        <Comments comments={comments} addComment={handleCommentAdd}
                  user={user} deleteComment={handleDeleteComment} areLoading={areLoadingComments}/>
    </div>
}

export default ArticlePage
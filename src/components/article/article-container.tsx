import {
    ActionsType,
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
import {DispatchType} from "../../redux/common-types"
import {useDispatch, useSelector} from "react-redux";
import {getArticleCommentsSelector, getArticleSelector, getCurrentUserSelector} from "../../redux/selectors";
import Error from "../error/error";


function ArticleContainer() {
    const [isLoadingArticle, setArticleLoading] = useState(true)
    const [areLoadingComments, setCommentsLoading] = useState(true)

    const dispatch: DispatchType<ActionsType> = useDispatch()
    const articleId = Number(useParams<{ articleId: string }>().articleId)
    const article = useSelector(getArticleSelector)
    const comments = useSelector(getArticleCommentsSelector)
    const user = useSelector(getCurrentUserSelector)
    const isOwner = article.author === user.username

    useEffect(() => {
        dispatch(getArticle(articleId)).then(() => {
            setArticleLoading(false)
        })
        dispatch(getArticleComments(articleId)).then(() => {
            setCommentsLoading(false)
        })
    }, [articleId])


    function handleCommentAddButtonClick(commentText: string) {
        dispatch(addComment(articleId, commentText))
    }

    function handleArticleSave(text: string) {
        dispatch(changeArticle(articleId, text))
    }


    if (isLoadingArticle || areLoadingComments) {
        return <Preloader/>
    }

    if (!article.id) {
        return <Error/>
    }

    return <div>
        <Article article={article} changeArticle={handleArticleSave} isOwner={isOwner}/>
        <Comments comments={comments} addComment={handleCommentAddButtonClick}
                  isAuthenticated={user.isAuthenticated}/>
    </div>
}

export default ArticleContainer
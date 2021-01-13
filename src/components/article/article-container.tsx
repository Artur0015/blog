import { addComment, changeArticle, getArticle, getArticleComments } from "../../redux/reducers/article-reducer"
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from "react-router-dom"
import Article from "./article"
import Comments from "./comments"
import Preloader from "../preloader/preloader"
import { mstpGetArticle, mstpGetComments } from "../../redux/selectors/article-selector"
import CommentInput from "./comment-input"
import { mstpGetUserUsername, mstpGetAuthenticationStatus } from "../../redux/selectors/auth-selector"
import { articleType, commentType } from "../../redux/reducers/reducer-types"
import { AppStateType } from "../../redux/redux-store"
const { connect } = require("react-redux")


type mapStateToPropsType = {
    article: articleType
    comments: Array<commentType>
    username: string
    isAuthenticated: boolean
}

type mapDispatchToPropsType = {
    getArticleComments: (articleId: number) => Promise<void>
    getArticle: (articleId: number) => Promise<void>
    changeArticle: (changedArticle: articleType) => Promise<void>
    addComment: (articleId: number, comment: commentType) => Promise<void>
}

type propsType = mapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<{ articleId: string }>

function ArticleAPI(props: propsType) {

    let [isLoadingArticle, setArticleLoading] = useState(false)
    let [areLoadingComments, setCommentsLoading] = useState(false)
    const articleId = Number(props.match.params.articleId)
    useEffect(() => {
        setArticleLoading(true)
        setCommentsLoading(true)
        props.getArticle(articleId).then(() => {
            setArticleLoading(false)
        })
        props.getArticleComments(articleId).then(() => {
            setCommentsLoading(false)
        })
    }, [])

    function handleCommentAddButtonClick(commentText: string) {
        props.addComment(articleId, { text: commentText, author: props.username })
    }

    return <div>{isLoadingArticle
        ? <Preloader />
        : <Article article={props.article} changeArticle={props.changeArticle} />}
        {areLoadingComments
            ? <Preloader />
            : <><Comments comments={props.comments} />
                {props.isAuthenticated
                    ? <CommentInput handleClick={handleCommentAddButtonClick} />
                    : null}
            </>}
    </div>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    article: mstpGetArticle(state),
    comments: mstpGetComments(state),
    isAuthenticated: mstpGetAuthenticationStatus(state),
    username: mstpGetUserUsername(state),

})

let ArticleWithUrlData = withRouter(ArticleAPI)
export const ArticleContainer = connect(mapStateToProps, {
    getArticleComments,
    getArticle,
    changeArticle,
    addComment,


})(ArticleWithUrlData)
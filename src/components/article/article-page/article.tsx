import React from 'react'
import {ArticleBodyType, ArticlePageType, UserType} from "../../../redux/common-types"
import {Paper, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import s from '../article.module.css'
import ArticleText from "./article-text";
import ArticleLikeDislike from "./article-like-dislikes";


type propsType = {
    article: ArticlePageType,
    changeArticle: (article: ArticleBodyType) => void
    user: UserType
    toggleLike: () => void
    toggleDislike: () => void
}


function Article({article, changeArticle, user, toggleDislike, toggleLike}: propsType) {

    function saveArticleChanges(text: string) {
        changeArticle({header: article.header, text})
    }

    return (<div className={s.article}>
        <Paper elevation={7}>
            <Typography variant={'h2'}>{article.header}</Typography>
            <ArticleText saveChanges={saveArticleChanges}
                         isOwner={user.isAuthenticated && article.author === user.username}
                         text={article.text}/>
            <ArticleLikeDislike isLiked={article.isLiked} isDisliked={article.isDisliked} likes={article.likes}
                                dislikes={article.dislikes} toggleLike={toggleLike} toggleDislike={toggleDislike}
                                isAuthenticated={user.isAuthenticated} />
            <p className={s.author}>
            <NavLink to={'/profile/' + article.author}> By {article.author}</NavLink>
    </p>
</Paper>
</div>)

}


export default Article
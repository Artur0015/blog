import React from 'react'
import {ArticleBodyType, FullArticleType, UserType} from "../../../../common-types"
import {Link} from "react-router-dom";
import s from './article.module.scss'
import ArticleLikeDislike from "./ArticleLikesDislikes";
import EditableTextarea from "../../../tools/EditableTextarea";
import UserPhoto from "../../../tools/UserPhoto";
import {configureDate} from "../../articles-menu/Post";
import {IoMdTrash} from "react-icons/all";


type propsType = {
    article: FullArticleType,
    changeArticle: (article: ArticleBodyType) => void
    user: UserType
    toggleLike: () => void
    toggleDislike: () => void
    deleteArticle: () => void
}


function Article({article, changeArticle, user, toggleDislike, toggleLike, deleteArticle}: propsType) {
    const isOwner = user.isAuthenticated && user.username === article.author?.username
    const pubDateInCorrectForm = configureDate(article.pubDate)

    function saveArticleChanges(text: string) {
        changeArticle({header: article.header, text})
    }

    const articleMinLengthValidator = (text: string) => text.length > 300

    return <div className={s.article}>
        <div className={s.user}>
            <Link to={`/profile/${article.author?.username}`}>
                <UserPhoto photo={article.author?.photo} halfRound/>
            </Link>
            <Link to={`/profile/${article.author?.username}`}>{article.author?.username}</Link>
        </div>
        <small>{pubDateInCorrectForm}</small>
        <h1>{article.header}</h1>
        {article.photo && <div className={s.container}>
            <img src={article.photo} alt=""/>
        </div>}
        <EditableTextarea saveChanges={saveArticleChanges} isOwner={isOwner} defaultText={article.text}
                          validate={articleMinLengthValidator} textareaClassName={'blue-input'}
                          editButtonClassName={'transparent-blue-btn'} saveButtonClassName={'transparent-blue-btn'}
                          cancelButtonClassName={'transparent-red-btn'} mainDivClassName={s.text}

        />
        <ArticleLikeDislike isLiked={article.isLiked} isDisliked={article.isDisliked} likes={article.likes}
                            dislikes={article.dislikes} toggleLike={toggleLike} toggleDislike={toggleDislike}
                            isAuthenticated={user.isAuthenticated}/>
        {isOwner && <button className={s.transparent + ' ' + s.delete} onClick={deleteArticle}><IoMdTrash/></button>}
    </div>
}


export default Article
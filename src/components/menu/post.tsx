import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './menu.module.css'
import {ArticleType} from "../../redux/common-types";


type PropsType = {
    article: ArticleType
}

const Post = ({article}: PropsType) => {
    if (article.text.length >= 300) {
        article.text = article.text.slice(0, 300) + '...'
    }

    return <div className={s.post}>
        <NavLink to={`/article/${article.id}`} style={{color: 'black'}}>
            <h1>{article.header}</h1>
            <p>{article.text}</p></NavLink>
        <span>By <NavLink to={'/profile/'+article.author}>{article.author}</NavLink></span>
    </div>
}

export default Post
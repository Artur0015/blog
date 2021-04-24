import React from 'react'
import {Link} from 'react-router-dom'
import {CommonArticleType} from "../../../common-types";
import s from './menu.module.scss'
import UserPhoto from "../../tools/UserPhoto";
import {IoMdThumbsDown, IoMdThumbsUp} from "react-icons/all";


export function configureDate(date: string) {
    const [year, month, monthName, day, hour, minute] = date.split(' ')
    const currentDate = new Date()
    const today = currentDate.getDate()
    if (!(currentDate.getFullYear() === Number(year))) { // not this year
        return `${monthName} ${year}`
    }
    if (today === Number(day) + 1) { // yesterday
        return `Yesterday at ${hour}:${minute}`
    }
    if (today === Number(day)) { // today
        return `Today at ${hour}:${minute}`
    }
    return `${monthName} ${day}` // this year
}

type PropsType = {
    article: CommonArticleType
    withUsername: boolean
}

const emptyArticlePhoto = process.env.REACT_APP_EMPTY_ARTICLE_PHOTO_URL

function Post({article, withUsername}: PropsType) {
    const pubDateInCorrectForm = configureDate(article.pubDate)

    return <div className={s.post}>
        <Link to={`/article/${article.id}`}>
            {withUsername && article.author && <div className={s.top}>
                <Link to={`/profile/${article.author.username}`}>
                    <UserPhoto photo={article.author.photo} halfRound/>
                </Link>
                <Link to={`/profile/${article.author.username}`}>{article.author.username}</Link>

            </div>}
            <div className={s.container}>
                <img src={article.photo ? article.photo : emptyArticlePhoto} alt="article" className={s.img}/>
            </div>
            <h4>{article.header}</h4>
            <div className={s.likes}>
                <IoMdThumbsUp size={25}/>
                <span>{article.likes}</span>
                <IoMdThumbsDown size={25}/>
                <span>{article.dislikes}</span>
            </div>
            <small>{pubDateInCorrectForm}</small>
        </Link>
    </div>
}

export default Post
import React from 'react'
import {Link} from 'react-router-dom'
import {CommonArticleType} from "../../../common-types";
import s from './menu.module.scss'
import UserPhoto from "../../tools/UserPhoto";
import {IoMdThumbsDown, IoMdThumbsUp} from "react-icons/all";


export function configureDate(date: string) {
    const pubDate = new Date(date)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const [pubYear, pubDay, hour, month] = [pubDate.getFullYear(), pubDate.getDate(), pubDate.getHours(), pubDate.getMonth()]
    const minutes = pubDate.getMinutes() < 10 ? '0' + pubDate.getMinutes() : pubDate.getMinutes()
    const currentDate = new Date()
    const today = currentDate.getDate()

    if (!(currentDate.getFullYear() === pubYear)) { // not this year
        return `${monthNames[month]} ${pubYear}`
    }
    if (today === pubDay + 1) { // yesterday
        return `Yesterday at ${hour}:${minutes}`
    }
    if (today === pubDay) { // today
        return `Today at ${hour}:${minutes}`
    }
    return `${monthNames[month]} ${pubDay}` // this year
}

type PropsType = {
    article: CommonArticleType
    withUsername: boolean
}

const emptyArticlePhoto = process.env.REACT_APP_EMPTY_ARTICLE_PHOTO_URL

function Post({article, withUsername}: PropsType) {
    const pubDateInCorrectForm = configureDate(article.pubDate)

    return <div className={s.post}>
        {withUsername && article.author && <Link to={`/profile/${article.author.username}`}>
            <div className={s.user}>
                <UserPhoto photo={article.author.photo} halfRound/>
                <span>{article.author.username}</span>
            </div>
        </Link>}

        <Link to={`/article/${article.id}`}>
            <div className={s.body}>
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
            </div>
        </Link>
    </div>
}

export default Post
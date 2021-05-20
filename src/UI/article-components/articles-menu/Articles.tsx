import {CommonArticleType} from "../../../common-types";
import Post from "./Post";
import React, {memo} from "react";
import s from './menu.module.scss'
import Paginator from "../../tools/paginator/Paginator";


type PropsType = {
    articles: Array<CommonArticleType>
    totalPages: number
    currentPage: number
    withUsername: boolean
}

const Articles = memo(({articles, currentPage, withUsername, totalPages}: PropsType) => {
    if (articles.length === 0) {
        return <h2 className={s.empty}>No Articles Yet</h2>
    }

    return <>
        <div className={s.articles}>
            {articles.map((article: CommonArticleType) => (
                <Post key={article.id} article={article} withUsername={withUsername}/>))}
        </div>
        <div className={s.paginator}>
            {totalPages > 1 && <Paginator currentPage={currentPage} totalPages={totalPages}/>}
        </div>
    </>
})

export default Articles
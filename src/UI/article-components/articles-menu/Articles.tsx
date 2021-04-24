import {CommonArticleType} from "../../../common-types";
import Post from "./Post";
import React from "react";
import s from './menu.module.scss'
import Paginator from "../../tools/paginator/Paginator";


type PropsType = {
    articles: Array<CommonArticleType>
    totalPages: number
    currentPage: number
    withUsername: boolean
}

function Articles({articles, currentPage, withUsername, totalPages}: PropsType) {
    return <>
            <div className={s.articles}>
                {articles.map((article: CommonArticleType) => (
                    <Post key={article.id} article={article} withUsername={withUsername}/>))}
            </div>
            <div className={s.paginator}>
            {totalPages > 1 && <Paginator currentPage={currentPage} totalPages={totalPages}/>}
            </div>
        </>
}

export default Articles
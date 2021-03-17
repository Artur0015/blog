import {CommonArticleType} from "../../redux/common-types";
import {Grid} from "@material-ui/core";
import Post from "./post";
import {Pagination, PaginationItem} from "@material-ui/lab";
import {Link} from "react-router-dom";
import React from "react";
import s from './menu.module.css'


type PropsType = {
    articles: Array<CommonArticleType>
    articlesCount: number
    currentPage: number
    withUsername: boolean
} & ({
    withDelete: true
    deleteArticle: (id: number) => void
} | {
    withDelete: false
})

function PageOfArticles({articles, articlesCount, currentPage, withUsername, ...props}: PropsType) {
    return <div className={s.pageOfArticles}>
        {articles.length
            ? <> <Grid container spacing={5}>
                {articles.map((article: CommonArticleType) => (
                    <Post key={article.id} article={article} withUsername={withUsername}
                          {...props.withDelete ? {
                              withDelete: true,
                              deleteArticle: props.deleteArticle
                          } : {withDelete: false}
                          }/>))}
            </Grid>
                <Pagination count={Math.ceil(articlesCount / 6)} page={currentPage} siblingCount={1}
                            boundaryCount={1} renderItem={(item) => (
                    <PaginationItem component={Link} to={'?page=' + (item.page)} {...item}/>)
                }/></>
            : <h2>No articles yet</h2>}
    </div>
}

export default PageOfArticles
import s from "./menu.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type propsType = {
    currentPage:number
    postsCount: number
    pageSize: number
}


function Paginator(props: propsType) {
    const pagesCount = Math.ceil(props.postsCount / props.pageSize)
    const pages = []

    if ([1, 2].indexOf(props.currentPage) !== -1) {
        pages.push(1, 2, 3, pagesCount)
    }
    else if ([1, 2, pagesCount, pagesCount - 1].indexOf(props.currentPage) === -1) {
        pages.push(1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount)
    }
    else if ([pagesCount, pagesCount - 1].indexOf(props.currentPage) !== -1) {
        pages.push(1, pagesCount - 2, pagesCount - 1, pagesCount)
    }

    return <div className={s.pagination}>
        {pages.map((page, index) => {
            return (page === props.currentPage)
                ? <NavLink to={`?page=${page}`} key={index} className={s.active} >{page}</NavLink>
                : <NavLink key={index} to={`?page=${page}`} >{page}</NavLink>
        })}
    </div>
}

export default Paginator
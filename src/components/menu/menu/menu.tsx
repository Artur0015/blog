import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './menu.module.css'
import {articleType} from "../../../redux/reducers/reducer-types";
const { default: Posts } = require("../posts/posts")

type propsType = {
    postsCount:number
    currentPage:number
    pageSize:number
    posts: Array<articleType>
}

const Menu = (props: propsType) => {
    let pagesCount = Math.ceil(props.postsCount / props.pageSize)
    let pages = []
    if ([1, 2].indexOf(props.currentPage) !== -1) {
        pages.push(1, 2, 3, pagesCount)
    }
    else if ([1, 2, pagesCount, pagesCount - 1].indexOf(props.currentPage) === -1) {
        pages.push(1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount)
    }
    else if ([pagesCount, pagesCount - 1].indexOf(props.currentPage) !== -1) {
        pages.push(1, pagesCount - 2, pagesCount - 1, pagesCount)
    }



    return (<div>
        <Posts posts={props.posts} />
        <div className={s.pagination}>
            {pages.map((page, index) => {
                return (page == props.currentPage)
                    ? <NavLink to={`?page=${page}`} key={index} className={s.active} >{page}</NavLink>
                    : <NavLink key={index} to={`?page=${page}`} >{page}</NavLink>
            })}
        </div>
    </div>)
}

export default Menu
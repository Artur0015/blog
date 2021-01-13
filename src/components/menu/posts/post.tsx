import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './post.module.css'
import {articleType} from "../../../redux/reducers/reducer-types";


const Post = (props: articleType) => {
    let text = props.text
    if (text.length >= 300) {
        text = props.text.slice(0, 300) + '...'
    }
    return <div className={s.post}>
        <NavLink to={`/article/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h1>{props.header}</h1>
            <p>{text}</p></NavLink>
        <span>By <a href='/'>{props.author}</a></span>
    </div>
}

export default Post
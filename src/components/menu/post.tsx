import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './menu.module.css'
import {articleType} from "../../redux/reducers/reducer-types";


const Post = (props: articleType) => {
    if (props.text.length >= 300) {
        props.text = props.text.slice(0, 300) + '...'
    }

    return <div className={s.post}>
        <NavLink to={`/article/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h1>{props.header}</h1>
            <p>{props.text}</p></NavLink>
        <span>By <a href='/'>{props.author}</a></span>
    </div>
}

export default Post
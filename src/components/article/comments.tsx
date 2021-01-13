import React from 'react'
import { commentType } from '../../redux/reducers/reducer-types'
import s from './article.module.css'


type propsType = {
    comments: Array<commentType>
}

const Comments = (props: propsType) => {
    if (props.comments.length === 0) {
        return <h2 className={s.empty}>No comments</h2>
    }

    return (<div className={s.comments}>
        <h2>Comments</h2>
        {props.comments.map((comment, index) => (
            <div className={s.comment} key={index}>
                <h3>{comment.author}</h3>
                <p>{comment.text}</p>
            </div>))}
    </div>
    )
}


export default Comments
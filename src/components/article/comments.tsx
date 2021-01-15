import React, {useState} from 'react'
import {commentType} from '../../redux/reducers/reducer-types'
import s from './article.module.css'


type propsType = {
    comments: Array<commentType>
    isAuthenticated: boolean
    handleClick: (commentText: string) => void
}


const Comments = (props: propsType) => {
    let [comment, setComment] = useState('')

    return <>{(props.comments.length === 0
            ? <h2 className={s.empty}>No comments</h2>
            : <div className={s.comments}>
                <h2>Comments</h2>
                {props.comments.map((comment, index) => (
                    <div className={s.comment} key={index}>
                        <h3>{comment.author}</h3>
                        <p>{comment.text}</p>
                    </div>))}
            </div>
    )}
        {props.isAuthenticated
            ? <div className={s.commentInput}>
                <span>Write comment</span>
                <textarea onChange={(event) => {
                    setComment(event.target.value)
                }} value={comment}/>
                <button onClick={(event) => {
                    props.handleClick(comment);
                    setComment('')
                }}>Submit
                </button>
            </div>
            : null}
    </>
}


export default Comments
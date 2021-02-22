import React, {ChangeEvent, useState} from 'react'
import {CommentType} from '../../redux/common-types'
import s from './article.module.css'


type propsType = {
    comments: Array<CommentType>
    isAuthenticated: boolean
    addComment: (commentText: string) => void
}


const Comments = ({addComment,comments, isAuthenticated}: propsType) => {
    const [comment, setComment] = useState('')

    function handleAddCommentClick() {
        addComment(comment)
        setComment('')
    }

    function handleChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        setComment(ev.target.value)
    }

    return <>{(comments.length === 0
            ? <h2 className={s.empty}>No comments</h2>
            : <div className={s.comments}>
                <h2>Comments</h2>
                {comments.map((comment, index) => (
                    <div className={s.comment} key={index}>
                        <h3>{comment.author}</h3>
                        <p>{comment.text}</p>
                    </div>))}
            </div>
    )}
        {isAuthenticated &&
            <div className={s.commentInput}>
                <span>Write comment</span>
                <textarea onChange={handleChange} value={comment}/>
                <button onClick={handleAddCommentClick}>Submit</button>
            </div>}
    </>
}


export default Comments
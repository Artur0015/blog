import { useState } from 'react'
import s from './article.module.css'

type propsType = {
    handleClick: (commentText: string) => void
}

function CommentInput(props: propsType) {
    let [comment, setComment] = useState('')
    return <div className={s.commentInput}>
        <span>Write comment</span>
        <textarea onChange={(event) => { setComment(event.target.value) }} value={comment} />
        <button onClick={(event) => { props.handleClick(comment); setComment('') }}>Submit</button>
    </div>
}

export default CommentInput
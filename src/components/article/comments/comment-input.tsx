import {Button, TextareaAutosize, Typography} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import s from './comment.module.css'

type PropsType = {
    addComment: (text: string) => void
}

function CommentInput({addComment}: PropsType) {
    const [text, setText] = useState('')

    function handleChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        if (ev.target.value.length < 1000) {
            setText(ev.target.value)
        }
    }

    function handleClick() {
        if (text) {
            addComment(text)
            setText('')
        }
    }

    return <div className={s.commentInput}>
        <Typography variant={'h5'}>Write comment</Typography>
        <TextareaAutosize onChange={handleChange} value={text} rowsMin={5}/>
        <Button onClick={handleClick}>Submit</Button>
    </div>
}

export default CommentInput
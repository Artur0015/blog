import React, {ChangeEvent, useState} from "react";
import s from './comment.module.scss'
import TextareaAutosize from "react-textarea-autosize";

type PropsType = {
    addComment: (text: string) => void
}

function CommentInput({addComment}: PropsType) {
    const [text, setText] = useState('')

    function handleChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        if (ev.target.value.length < 900) {
            setText(ev.target.value)
        }
    }

    function handleSubmit() {
        if (text) {
            addComment(text)
            setText('')
        }
    }

    function handleCancel() {
        setText('')
    }
    return <div className={s.CommentInput}>
        <label>Write Comment</label>
        <TextareaAutosize value={text} onChange={handleChange} className={'blue-input'}/>
        {Boolean(text) && <>
            <button className={'blue-btn'} onClick={handleSubmit}>OK</button>
            <button className={'red-btn'} onClick={handleCancel}>CANCEL</button>
        </>}
    </div>
}

export default CommentInput
import s from './article.module.css'
import React, {ChangeEvent, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import {ArticleType} from "../../redux/common-types"

type propsType = {
    article: ArticleType,
    changeArticle: (text: string) => void
    isOwner: boolean
}


function Article({article, changeArticle, isOwner}: propsType) {
    const [isEditMode, setEditMode] = useState(false)
    const [text, setText] = useState(article.text)


    function activateEditMode() {
        setEditMode(true)
    }

    function dropChanges(){
        setEditMode(false)
        setText(article.text)
    }

    function saveArticleChanges() {
        changeArticle(text)
        setEditMode(false)
    }

    function handleChange(evt: ChangeEvent<HTMLTextAreaElement>) {
        setText(evt.target.value)
    }



    return (<div className={s.article}>
        <h1>{article.header}</h1>
        {isOwner
            ? isEditMode
                ? <>
                    <TextareaAutosize onChange={handleChange} name='text' value={text} />
                    <button onClick={saveArticleChanges}>Save</button>
                    <button onClick={dropChanges}>Back</button>

                </>
                : <>
                    <p>{article.text}</p>
                    <button onClick={activateEditMode}>Edit</button>
                </>
            : <p>{article.text}</p>}

        <span>By <a href='/'>{article.author}</a></span>
    </div>)

}


export default Article
import s from './article.module.css'
import React, {ChangeEvent, useCallback, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import {articleType} from "../../redux/reducers/reducer-types"

type propsType = {
    article: articleType,
    changeArticle: (changedArticle: articleType) => void
}


function Article(props: propsType) {
    let [editMode, setEditMode] = useState(false)
    let [article, setArticle] = useState(props.article)
    let [text, setText] = useState(props.article.text)


    function activateEditMode() {
        setEditMode(true)
    }

    function dropChanges() {
        setEditMode(false)
        setArticle({...props.article})
    }

    const saveArticleChanges = () => {
        props.changeArticle({...article, text})
        setEditMode(false)
        setArticle({...article, text: text})
    }

    const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        setText(evt.target.value)
    }


    return (<div className={s.article}>
        <h1>{article.header}</h1>
        {(editMode === false) ?
            <><p>{article.text}</p>
                <button onClick={activateEditMode}>Edit</button>
            </> :
            <>
                <TextareaAutosize onChange={handleChange} name='text' value={text}></TextareaAutosize>
                <button onClick={saveArticleChanges}>Save</button>
                <button onClick={dropChanges}>Back</button>
            </>}

        <span>By <a href='/'>{article.author}</a></span>
    </div>)

}


export default Article
import React, {ChangeEvent, useState} from "react";
import {Button, TextareaAutosize, Typography} from "@material-ui/core";
import s from "../article.module.css";

type PropsType = {
    text: string
    isOwner: boolean
    saveChanges: (text: string) => void
}

function ArticleText({text, isOwner, saveChanges}: PropsType) {
    const [isEditMode, setEditMode] = useState(false)
    const [textValue, setTextValue] = useState(text)

    function handleChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        setTextValue(ev.target.value)
    }

    function dropChanges() {
        setEditMode(false)
        setTextValue(text)
    }

    function activateEditMode() {
        setEditMode(true)
    }

    function saveArticleChanges() {
        saveChanges(textValue)
        setEditMode(false)
    }

    return <>
        {isEditMode
            ? <>
                <TextareaAutosize onChange={handleChange} name='text' value={textValue}/>
                <Button onClick={saveArticleChanges} disabled={textValue.length < 300}>Save</Button>
                <Button onClick={dropChanges}>Back</Button>

            </>
            : <Typography variant={'body1'}>{text}</Typography>
        }
        {isOwner && !isEditMode &&
        <Button className={s.edit} onClick={activateEditMode}>Edit</Button>}</>
}


export default ArticleText
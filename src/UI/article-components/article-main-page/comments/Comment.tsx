import React, {useRef, useState} from "react";
import {CommentType} from "../../../../common-types";
import s from './comment.module.scss'
import UserPhoto from "../../../tools/UserPhoto";
import {Link} from 'react-router-dom'
import {configureDate} from "../../articles-menu/Post";
import {BsThreeDotsVertical, HiPencil, IoMdTrash} from "react-icons/all";
import EditableTextarea from "../../../tools/EditableTextarea";

type PropsType = {
    comment: CommentType
    isOwner: boolean
    deleteComment: (commentId: number) => void
    changeComment: (id: number, text: string) => void
}

function Comment({comment, isOwner, deleteComment, changeComment}: PropsType) {
    const [isMenuOpened, setMenuOpened] = useState(false)
    const editButtonRef = useRef<HTMLButtonElement>(null)

    const pubDateInCorrectForm = configureDate(comment.pubDate)

    function handleDelete() {
        deleteComment(comment.id)
        setMenuOpened(false)
    }

    function handleSave(text: string) {
        changeComment(comment.id, text)
    }

    function toggleMenu() {
        setMenuOpened(!isMenuOpened)
    }

    function startEditing() {
        editButtonRef.current?.click()
        setMenuOpened(false)
    }

    return <div className={s.comment}>
        <div className={s.photo}><Link to={`/profile/${comment.author.username}`}><UserPhoto
            photo={comment.author.photo} round/></Link></div>
        <div className={s.content}>
            <div className={s.top}>
                <Link to={`/profile/${comment.author.username}`}>{comment.author.username}</Link>
                <small>{pubDateInCorrectForm}</small>
            </div>
            <EditableTextarea saveChanges={handleSave} isOwner={isOwner} defaultText={comment.text}
                              editButtonRef={editButtonRef} mainDivClassName={s.text}
                              textareaClassName={'blue-input'} cancelButtonClassName={'red-btn'}
                              saveButtonClassName={'blue-btn'} editButtonClassName={s.edit}/>
        </div>
        {isOwner && <button onClick={toggleMenu} className={s.icon}><BsThreeDotsVertical/></button>}
        {isMenuOpened && <ul className={s.menu}>
            <li onClick={handleDelete}><span><IoMdTrash/></span>Delete</li>
            <li onClick={startEditing}><span><HiPencil/></span>Edit</li>
        </ul>}

    </div>
}

export default Comment
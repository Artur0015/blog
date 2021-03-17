import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React from "react";
import {CommentType} from "../../../redux/common-types";
import s from './comment.module.css'

type PropsType = {
    comment: CommentType
    isOwner: boolean
    deleteComment: (commentId: number) => void
}

function Comment({comment, isOwner, deleteComment}: PropsType) {
    function handleDelete() {
        deleteComment(comment.id)
    }

    return <List>
        <ListItem className={s.comment} style={{alignItems: 'inherit'}}>
            <ListItemAvatar className={s.avatar}>
                <Avatar src={comment.author.photo} />
            </ListItemAvatar>
            <ListItemText primary={comment.author.username} secondary={comment.text} style={{paddingRight:35}}/>
            {isOwner &&
            <ListItemSecondaryAction>
                <IconButton onClick={handleDelete}>
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
    </List>
}

export default Comment
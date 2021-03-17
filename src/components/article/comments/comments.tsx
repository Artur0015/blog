import React from 'react'
import {CommentType, UserType} from '../../../redux/common-types'
import {Typography} from "@material-ui/core";
import Comment from "./comment";
import CommentInput from "./comment-input";
import s from './comment.module.css'
import PreloadImg from '../../preloader/preloadimg.gif'


type propsType = {
    comments: Array<CommentType>
    user: UserType
    addComment: (commentText: string) => void
    deleteComment: (commentId: number) => void
    areLoading: boolean
}


const Comments = ({addComment, comments, user, deleteComment, areLoading}: propsType) => {

    return <div className={s.main}>
        {user.isAuthenticated &&
        <CommentInput addComment={addComment}/>}
        {
            areLoading
                ? <img src={PreloadImg} className={s.preloadImg} alt={'loading'}/>
                : (comments.length !== 0 &&
                <>
                    <Typography variant={'h4'}>Comments</Typography>
                    {comments.map(c => <Comment key={c.id} comment={c}
                                                isOwner={user.isAuthenticated && c.author.username === user.username}
                                                deleteComment={deleteComment}/>)}
                </>)}
    </div>
}

export default Comments
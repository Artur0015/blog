import s from "../article.module.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import React from "react";

type PropsType = {
    isLiked: boolean
    isDisliked: boolean
    likes: number
    dislikes: number
    toggleLike: () => void
    toggleDislike: () => void
    isAuthenticated: boolean
}

function ArticleLikeDislike({likes, dislikes, toggleDislike, toggleLike, isAuthenticated, isLiked,
                                isDisliked,}: PropsType) {

    function checkLikeDislikeStatus(el: 'isLiked' | 'isDisliked') {
        if (!isAuthenticated) return 'disabled'
        if(el === 'isLiked' && isLiked) return 'primary'
        if(el === 'isDisliked' && isDisliked) return 'primary'
        return 'inherit'
    }

    return <div className={s.likesSpace}>
        <ThumbUpIcon color={checkLikeDislikeStatus('isLiked')} onClick={toggleLike}/>
        <span>{likes}</span>
        <ThumbDownIcon color={checkLikeDislikeStatus('isDisliked')} onClick={toggleDislike}/>
        <span>{dislikes}</span>
    </div>
}

export default ArticleLikeDislike
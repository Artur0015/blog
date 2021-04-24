import s from "./article.module.scss";
import {IoMdThumbsDown, IoMdThumbsUp} from "react-icons/all";
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

function ArticleLikeDislike({
                                likes, dislikes, toggleDislike, toggleLike, isAuthenticated, isLiked,
                                isDisliked,
                            }: PropsType) {

    function getColor(el: 'isLiked' | 'isDisliked') {
        if(!isAuthenticated) return 'grey'
        if(el === 'isLiked' && isLiked) return 'blue'
        if(el === 'isDisliked' && isDisliked) return 'blue'
        return 'black'
    }

    return <div className={s.likeSpace}>
        <button disabled={!isAuthenticated} className={s.transparent}>
            <IoMdThumbsUp onClick={toggleLike} size={30} style={{color: getColor('isLiked')}}/>
        </button>
        <b>{likes}</b>
        <button disabled={!isAuthenticated} className={s.transparent}>
            <IoMdThumbsDown onClick={toggleDislike} size={30} style={{color: getColor('isDisliked')}}/>
        </button>
        <b>{dislikes}</b>
    </div>
}

export default ArticleLikeDislike
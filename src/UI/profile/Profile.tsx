import {useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {currentUserSelector, profileSelector} from "../../BLL/selectors";
import React, {useEffect, useState} from "react";
import Preloader from "../tools/preloader/Preloader";
import Error from "../tools/error/Error";
import UserInfo from "./UserInfo";
import Articles from "../article-components/articles-menu/Articles";
import {useAppDispatch} from "../../BLL/store";
import {
    changeUserAboutMe,
    changeUserPhoto,
    getUserArticlesByUsername,
    getUserByUsername,
    subscribeToUser,
    unsubscribeFromUser,
} from "../../BLL/slices/profile-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import s from './profile.module.scss'
import ButtonPopup from "../tools/popup/Popup";

function Profile() {
    const [isLoadingUser, setLoadingUser] = useState(true)
    const [areLoadingArticles, setLoadingArticles] = useState(true)
    const [isError, setError] = useState(false)

    const currentPage = Number((useLocation().search.match(/\?page=\d{1,}/) || [])[0]?.slice(6)) || 1
    const pageSize = 6
    const username = useParams<{ username: string }>().username

    const dispatch = useAppDispatch()
    const currentUser = useSelector(currentUserSelector)
    const profileUser = useSelector(profileSelector)
    const isOwner = currentUser.isAuthenticated && currentUser.username === username

    useEffect(() => {
        setLoadingUser(true)
        dispatch(getUserByUsername(username))
            .then(unwrapResult)
            .catch(() => setError(true))
            .then(() => setLoadingUser(false))
    }, [username])

    useEffect(() => {
        setLoadingArticles(true)
        dispatch(getUserArticlesByUsername({
            username,
            requestParams: {currentPage, pageSize}
        })).then(() => setLoadingArticles(false))
    }, [currentPage, username])


    function setAboutMe(aboutMe: string) {
        dispatch(changeUserAboutMe(aboutMe))
    }

    function setPhoto(photo: File) {
        dispatch(changeUserPhoto(photo))
    }

    function handleSubscribe() {
        dispatch(subscribeToUser(profileUser.username))
    }

    function handleUnsubscribe() {
        dispatch(unsubscribeFromUser(profileUser.username))
    }

    if (isLoadingUser || areLoadingArticles) return <Preloader/>

    if (isError) return <Error/>

    return <>
        <UserInfo user={profileUser} isOwner={isOwner} setPhoto={setPhoto} setAboutMe={setAboutMe}/>
        {currentUser.isAuthenticated && !isOwner && (profileUser.isSubscribed
            ? <ButtonPopup questionText={'Are you sure that you want to stop following this author?'}
                           onAccept={handleUnsubscribe} buttonClassName={s.subBtn + ' grey-btn'}
                           acceptText={'Unsubscribe'} buttonText={'Subscribed'}/>
            : <button onClick={handleSubscribe} className={s.subBtn + ' blue-btn'}>Subscribe</button>)}

        <Articles withUsername={false} articles={profileUser.articles.data} currentPage={currentPage}
                  totalPages={Math.ceil(profileUser.articles.count / pageSize)}/>
    </>
}


export default Profile
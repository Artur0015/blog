import {useDispatch, useSelector} from "react-redux";
import {DispatchType} from "../../redux/common-types";
import {
    ActionsType,
    deleteArticle,
    getUserArticles,
    getUserProfileInfo,
    setMyUserAboutMe,
    setMyUserPhoto
} from "../../redux/reducers/profile-reducer";
import {useLocation, useParams} from "react-router-dom";
import {getCurrentUserSelector, getProfileUserSelector} from "../../redux/selectors";
import React, {useEffect, useState} from "react";
import Preloader from "../preloader/preloader";
import Error from "../error/error";
import UserInfo from "./user-info";
import s from './profile.module.css'
import PageOfArticles from "../menu/page-of-articles";

function Profile() {
    const [isLoading, setLoading] = useState(true)

    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1
    const username = useParams<{ username: string }>().username

    const currentUser = useSelector(getCurrentUserSelector)
    const profileUser = useSelector(getProfileUserSelector)
    const isOwner = currentUser.username === profileUser.username
    const dispatch = useDispatch<DispatchType<ActionsType>>()

    useEffect(() => {
        setLoading(true)
        dispatch(getUserProfileInfo(username)).then(() => {
            setLoading(false)
        })
    }, [username])

    useEffect(() => {
        dispatch(getUserArticles(username, currentPage))
    }, [currentPage, username])


    function changeUserAboutMe(text: string) {
        dispatch(setMyUserAboutMe(profileUser.username, text))
    }

    function setPhoto({target: {files}}: React.ChangeEvent<HTMLInputElement>) {
        if (files?.length) {
            dispatch(setMyUserPhoto(files[0]))
        }
    }

    function handleDeleteArticle(articleId: number) {
        dispatch(deleteArticle(articleId))
    }

    if (isLoading) {
        return <Preloader/>
    }

    if (!profileUser.id) {
        return <Error/>
    }

    return <>
        <h1 className={s.title}>{profileUser.username}</h1>
        <UserInfo changeAboutMe={changeUserAboutMe} user={profileUser} isOwner={isOwner} setPhoto={setPhoto}/>
        <PageOfArticles withDelete={isOwner} deleteArticle={handleDeleteArticle} withUsername={false}
                        articles={profileUser.articles.data} articlesCount={profileUser.articles.count}
                        currentPage={currentPage}/>
    </>
}


export default Profile
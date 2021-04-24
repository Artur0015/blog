import {useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {getCurrentUserSelector, getProfileUserSelector} from "../../BLL/selectors";
import React, {useEffect, useState} from "react";
import Preloader from "../tools/preloader/Preloader";
import Error from "../tools/error/Error";
import UserInfo from "./UserInfo";
import Articles from "../article-components/articles-menu/Articles";
import {useAppDispatch} from "../../BLL/store";
import {
    changeUser,
    getUserArticlesByUsername,
    getUserByUsername,
} from "../../BLL/slices/profile-slice";

function Profile() {
    const [isLoadingUser, setLoadingUser] = useState(true)
    const [areLoadingArticles, setLoadingArticles] = useState(true)

    const currentPage = Number((useLocation().search.match(/\?page=\d{1,}/) || [])[0]?.slice(6)) || 1
    const pageSize = 6
    const username = useParams<{ username: string }>().username

    const dispatch = useAppDispatch()
    const currentUser = useSelector(getCurrentUserSelector)
    const profileUser = useSelector(getProfileUserSelector)
    const isOwner = currentUser.isAuthenticated && currentUser.username === username

    useEffect(() => {
        setLoadingUser(true)
        dispatch(getUserByUsername(username)).then(() => setLoadingUser(false))
    }, [username])

    useEffect(() => {
        setLoadingArticles(true)
        dispatch(getUserArticlesByUsername({
            username,
            requestParams: {currentPage, pageSize}
        })).then(() => setLoadingArticles(false))
    }, [currentPage, username])


    function changeUserAboutMe(aboutMe: string) {
        dispatch(changeUser({aboutMe}))
    }

    function setPhoto(photo: File) {
            dispatch(changeUser({photo}))
    }

    if (isLoadingUser || areLoadingArticles) {
        return <Preloader/>
    }

    if (!profileUser.id) {
        return <Error/>
    }

    return <>
        <UserInfo user={profileUser} isOwner={isOwner} setPhoto={setPhoto} setAboutMe={changeUserAboutMe}/>
        <Articles withUsername={false} articles={profileUser.articles.data} currentPage={currentPage}
                  totalPages={Math.ceil(profileUser.articles.count / pageSize)}/>
    </>
}


export default Profile
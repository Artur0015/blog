import {useDispatch, useSelector} from "react-redux";
import {ArticleType, DispatchType} from "../../redux/common-types";
import {ActionsType, getUserProfile, setMyUserAboutMe, setMyUserPhoto} from "../../redux/reducers/profile-reducer";
import {useLocation, useParams} from "react-router-dom";
import {getCurrentUserSelector, getProfileUserSelector} from "../../redux/selectors";
import {useEffect, useState} from "react";
import Preloader from "../preloader/preloader";
import Error from "../error/error";
import UserInfo from "./user-info";
import s from './profile.module.css'
import Post from "../menu/post";
import Paginator from "../menu/paginator";

function Profile() {
    const [isLoadingFirstPage, setLoadingFirstPage] = useState(true)
    const [isLoadingNewPage, setLoadingNewPage] = useState(false)

    const location = useLocation()
    const currentPage = parseInt(location.search.slice(6)) || 1
    const username = useParams<{ username: string }>().username

    const currentUser = useSelector(getCurrentUserSelector)
    const profileUser = useSelector(getProfileUserSelector)
    const isOwner = currentUser.username === profileUser.username
    const dispatch = useDispatch<DispatchType<ActionsType>>()

    useEffect(() => {
        setLoadingFirstPage(true)
        dispatch(getUserProfile(username, currentPage)).then(() => {
            setLoadingFirstPage(false)
        })
    }, [username])

    useEffect(() => {
        if (currentPage !== 1 || !isLoadingFirstPage) {
            setLoadingNewPage(true)
            dispatch(getUserProfile(username, currentPage)).then(() => {
                setLoadingNewPage(false)
            })
        }
    }, [currentPage, username])


    function changeUserAboutMe(text: string) {
        dispatch(setMyUserAboutMe(profileUser.username, text))
    }

    function setPhoto({target: {files}}: React.ChangeEvent<HTMLInputElement>) {
        if (files?.length) {
            dispatch(setMyUserPhoto(files[0]))
        }
    }

    if (isLoadingFirstPage) {
        return <Preloader/>
    }

    if (!profileUser.id) {
        return <Error/>
    }


    return <div className={s.profile}>
        <h1>{profileUser.username}</h1>
        <UserInfo changeAboutMe={changeUserAboutMe} user={profileUser} isOwner={isOwner} setPhoto={setPhoto}/>
        <div className={s.articles}>
            {isLoadingNewPage
                ? <Preloader/>
                : <>{profileUser.articles.articles.map((article: ArticleType) =>
                    <Post key={article.id} article={article}/>)}
                    <Paginator currentPage={currentPage} count={profileUser.articles.count} pageSize={3}/></>}
        </div>
    </div>
}


export default Profile
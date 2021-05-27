import {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../BLL/store";
import {getMySubscriptions, subscribeToUser, unsubscribeFromUser} from "../../BLL/slices/users-slice";
import {useSelector} from "react-redux";
import {currentUserSelector, usersSelector} from "../../BLL/selectors";
import {unwrapResult} from "@reduxjs/toolkit";
import Preloader from "../tools/preloader/Preloader";
import Error from "../tools/error/Error";
import s from './subscribed-users.module.scss'
import User from "./User";
import {Redirect} from "react-router-dom";

function SubscribedUsers() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    const dispatch = useAppDispatch()
    const {isAuthenticated} = useSelector(currentUserSelector)
    const users = useSelector(usersSelector)

    useEffect(() => {
        dispatch(getMySubscriptions())
            .then(unwrapResult)
            .catch(() => setError(true))
            .then(() => setLoading(false))
    }, [])

    const handleSubscribe = useCallback((username: string) => {
        dispatch(subscribeToUser(username))
    }, [])

    const handleUnsubscribe = useCallback((username: string) => {
        dispatch(unsubscribeFromUser(username))
    }, [])

    if(!isAuthenticated) return <Redirect to={'/'}/>
    if (isLoading) return <Preloader/>
    if (isError) return <Error/>
    if (!users.length) return <h2 className={s.empty}>Your subscriptions list is empty</h2>

    return <div className={s.usersList}>
        {users.map(u => <User user={u} subscribe={handleSubscribe} unsubscribe={handleUnsubscribe} key={u.id}/>)}
    </div>
}

export default SubscribedUsers
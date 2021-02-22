import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ActionsType, getUserInfo, logoutUser} from '../../redux/reducers/auth-reducer'
import {DispatchType} from '../../redux/common-types'
import cn from "classnames";
import s from "./navbar.module.css";
import {NavLink} from "react-router-dom";
import {getCurrentUserSelector} from "../../redux/selectors";


function NavigationContainer() {
    const [buttonText, setButtonText] = useState('>')
    const [isLoading, setLoading] = useState(true)


    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const user = useSelector(getCurrentUserSelector)


    useEffect(() => {
        setLoading(true)
        dispatch(getUserInfo()).then(() => setLoading(false))
    }, [])


    function handleClick() {
        if (buttonText === '>') {
            setButtonText('<')
        } else {
            setButtonText('>')
        }
    }

    function handleLogoutClick() {
        dispatch(logoutUser())
    }

    if(isLoading){
        return <></>
    }

    return <>
        <div className={cn({[s.non_active]: buttonText === '>'}, s.nav)}>
            <button onClick={handleClick}>{buttonText}</button>
            {user.photo && <img src={user.photo}/>}
            <NavLink to='/menu' activeClassName={s.active}>Menu</NavLink>
            {(user.isAuthenticated)
                ? <>
                    <NavLink to='/write' activeClassName={s.active}>Write</NavLink>
                    <NavLink to={'/profile/' + user.username} activeClassName={s.active}>Profile</NavLink>
                    <NavLink to='/menu' onClick={handleLogoutClick}>Log Out</NavLink>

                </>
                : <>
                    <NavLink to='/login' activeClassName={s.active}>Log in</NavLink>
                    <NavLink to='/signup' activeClassName={s.active}>Sign up</NavLink>
                </>}
        </div>
    </>
}


export default NavigationContainer
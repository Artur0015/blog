import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {actionsType, getUserInfo, logoutUser} from '../../redux/reducers/auth-reducer'
import {dispatchType} from '../../redux/redux-store'
import { mstpGetAuthenticationStatus, mstpGetUserPhoto, mstpGetUserUsername } from '../../redux/selectors/auth-selector'
import cn from "classnames";
import s from "./navigation.module.css";
import {NavLink} from "react-router-dom";


function NavigationContainer() {
    let [buttonText, setButtonText] = React.useState('>')
    // let [divClass, setDivClass] = React.useState(s.non_active + ' ' + s.nav)

    const dispatch = useDispatch<dispatchType<actionsType>>()
    const isAuthenticated = useSelector(mstpGetAuthenticationStatus)
    const photo = useSelector(mstpGetUserPhoto)
    const username = useSelector(mstpGetUserUsername)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [])


    function handleClick() {
        if (buttonText === '>') {
            setButtonText('<')
            // setDivClass(s.nav)
        } else {
            setButtonText('>')
            // setDivClass(s.non_active + ' ' + s.nav)
        }
    }

    function handleLogoutClick() {
        dispatch(logoutUser())
    }

    return <><div className={cn({ [s.non_active]: buttonText === '>' }, s.nav)}>
        <button onClick={handleClick}>{buttonText}</button>
        {photo ? <img src={photo} />: null}
        <NavLink to='/menu' activeClassName={s.active}>Menu</NavLink>
        {(isAuthenticated)
            ? <><NavLink to='/logout' activeClassName={s.active} onClick={handleLogoutClick}>Log Out</NavLink>
                <NavLink to='/write' activeClassName={s.active}>Write</NavLink></>
            : <><NavLink to='/login' activeClassName={s.active}>Log in</NavLink>
                <NavLink to='/signup' activeClassName={s.active}>Sign up</NavLink></>}
    </div></>
}


export default NavigationContainer
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './navigation.module.css'
import cn from 'classnames'

type propsType = {
    isAuthenticated:boolean
    photo: string
    username:string
    handleLogoutClick: () => void
}

function Navigation(props: propsType) {
    let [buttonText, setButtonText] = React.useState('>')
    // let [divClass, setDivClass] = React.useState(s.non_active + ' ' + s.nav)
    function handleClick() {
        if (buttonText === '>') {
            setButtonText('<')
            // setDivClass(s.nav)
        } else {
            setButtonText('>')
            // setDivClass(s.non_active + ' ' + s.nav)
        }
    }

    return <><div className={cn({ [s.non_active]: buttonText === '>' ? true : false }, s.nav)}>
        <button onClick={handleClick}>{buttonText}</button>
        {props.photo ? <img src={props.photo} />: null}
        <NavLink to='/menu' activeClassName={s.active}>Menu</NavLink>
        {(props.isAuthenticated)
            ? <><NavLink to='/logout' activeClassName={s.active} onClick={props.handleLogoutClick}>Log Out</NavLink>
                <NavLink to='/write' activeClassName={s.active}>Write</NavLink></>
            : <><NavLink to='/login' activeClassName={s.active}>Log in</NavLink>
                <NavLink to='/signup' activeClassName={s.active}>Sign up</NavLink></>}
    </div></>
}

export default Navigation
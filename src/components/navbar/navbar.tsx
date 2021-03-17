import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ActionsType, logoutUser} from '../../redux/reducers/auth-reducer'
import {DispatchType} from '../../redux/common-types'
import {getCurrentUserSelector} from "../../redux/selectors";
import {IconButton, Tab} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import s from './navbar.module.css'
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import {NavLink} from "react-router-dom";
import {GoSignIn, GoSignOut} from 'react-icons/go'
import {BiKey} from "react-icons/all";

function Navbar() {
    const [isMenuOpened, setMenuStatus] = useState(false)


    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const user = useSelector(getCurrentUserSelector)


    function toggleMenu() {
        setMenuStatus(!isMenuOpened)
    }

    function handleLogoutClick() {
        dispatch(logoutUser())
    }


    return <>
        <IconButton onClick={toggleMenu} className={isMenuOpened ? s.buttonActive : ''}
                    style={{transition: '0.5s', position: isMenuOpened ? 'absolute' : 'relative'}}>
            <MenuIcon/>
        </IconButton>
        <div className={(isMenuOpened ? s.navActive : s.navUnActive)}>
            <div className={user.isAuthenticated ? s.x4 : s.x3}>
                <NavLink to={'/'}>
                    <Tab icon={<LibraryBooksRoundedIcon/>}/>
                </NavLink>
                {user.isAuthenticated
                    ? <>
                        <NavLink to={'/write'}>
                            <Tab icon={<CreateIcon/>}/>
                        </NavLink>
                        <NavLink to={'/profile/' + user.username}>
                            <Tab icon={<PersonIcon/>}/>
                        </NavLink>
                            <Tab icon={<GoSignOut style={{height:20, width: 20}}/>} onClick={handleLogoutClick}/>
                    </>
                    : <>
                        <NavLink to={'/signup'}>
                            <Tab icon={<BiKey style={{height:24, width: 24}}/>}/>
                        </NavLink>
                        <NavLink to={'/login'}>
                            <Tab icon={<GoSignIn style={{height:20, width: 20}}/>} />
                        </NavLink>
                    </>}
            </div>
        </div>
    </>
}

export default Navbar

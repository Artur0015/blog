import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {currentUserSelector} from "../../BLL/selectors";
import s from './sidebar.module.scss'
import {
    BsFillPeopleFill,
    BsPeopleCircle,
    FiMenu,
    GoSignIn,
    HiLogin, HiLogout,
    HiOutlinePencil,
    MdLibraryBooks,
    MdSubscriptions,
} from "react-icons/all";
import {useAppDispatch} from "../../BLL/store";
import {logoutUser} from "../../BLL/slices/auth-slice";
import {NavLink, Link} from "react-router-dom";
import BackgroundCloser from "../tools/background-closer/BackgroundCloser";
import Popup from "../tools/popup/Popup";


function Sidebar() {
    const [isMenuOpen, setIsOpen] = useState(false)

    const dispatch = useAppDispatch()
    const user = useSelector(currentUserSelector)

    function openMenu() {
        setIsOpen(true)
    }

    function closeMenu() {
        setIsOpen(false)
    }

    function handleLogoutClick() {
        dispatch(logoutUser())
    }

    return <>

        <div className={s.nav}>
            <button onClick={openMenu}>
                <FiMenu/>
            </button>
            {user.isAuthenticated
                ? <Popup questionText={'Are you sure that you want to log out from this account?'} acceptText={'Log Out'}
                    onAccept={handleLogoutClick} buttonText={<HiLogout/>} buttonStyles={{marginLeft: 'auto'}}/>
                : <Link className={s.rightTopBtn} to={'/login'}>
                    <HiLogin/>
                </Link>}
        </div>
        <div className={s.menu + (isMenuOpen ? '' : ` ${s.closed}`)}>
            <div className={s.buttonWrapper}>
                <button onClick={closeMenu}>
                    <FiMenu/>
                </button>
            </div>
            <NavLink to={'/'} exact activeClassName={s.active}><span><MdLibraryBooks/></span>New Articles</NavLink>
            {user.isAuthenticated
                ? <>

                    <NavLink to={'/subscriptions'} exact activeClassName={s.active}>
                        <span><MdSubscriptions/></span>Subscriptions
                    </NavLink>
                    <NavLink to={'/subscriptions/users'} exact activeClassName={s.active}>
                        <span><BsFillPeopleFill/></span>Authors
                    </NavLink>
                    <NavLink to={`/profile/${user.username}`} exact activeClassName={s.active}>
                        <span><BsPeopleCircle/></span>Profile
                    </NavLink>
                    <NavLink to={'/write'} exact activeClassName={s.active}>
                        <span><HiOutlinePencil/></span>Write Article
                    </NavLink>
                </>
                : <>
                    <NavLink to={'/login'} exact activeClassName={s.active}>
                        <span><HiLogin/></span>Log In
                    </NavLink>
                    <NavLink to={'/signup'} exact activeClassName={s.active}>
                        <span><GoSignIn/></span>Sign Up
                    </NavLink>
                </>}
        </div>
        {isMenuOpen && <BackgroundCloser onClick={closeMenu}/>}
    </>

}

export default Sidebar

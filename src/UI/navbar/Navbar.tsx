import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getCurrentUserSelector} from "../../BLL/selectors";
import s from './navbar.module.scss'
import {
    AiOutlineLogin,
    AiOutlineLogout,
    BiKey,
    FaUserAlt, FiMenu,
    MdLibraryBooks,
    RiPencilFill,
} from "react-icons/all";
import {useAppDispatch} from "../../BLL/store";
import {logoutUser} from "../../BLL/slices/auth-slice";
import {useHistory} from "react-router";


function Navbar() {
    const [isMenuOpened, setMenuStatus] = useState(false)

    const history = useHistory()

    const dispatch = useAppDispatch()
    const user = useSelector(getCurrentUserSelector)

    function toggleMenu() {
        setMenuStatus(!isMenuOpened)
    }

    function handleLogoutClick() {
        dispatch(logoutUser())
    }

    return <div className={isMenuOpened ? s.navbar + ' ' + s.navbarOpen : s.navbar}>
        <button onClick={toggleMenu}>
            <FiMenu className={s.menuButton + ' ' + (isMenuOpened ? s.rotate : '')}/>
        </button>
        {isMenuOpened
            ? <>
                <button onClick={() => history.push('/')}><MdLibraryBooks/></button>

                {user.isAuthenticated
                    ? <>
                        <button onClick={() => history.push(`/profile/${user.username}`)}><FaUserAlt/></button>
                        <button onClick={() => history.push('/write')}><RiPencilFill/></button>
                        <button onClick={handleLogoutClick}><AiOutlineLogout/></button>

                    </>
                    : <>
                        <button onClick={() => history.push('/signup')}><BiKey/></button>
                        <button onClick={() => history.push('/login')}><AiOutlineLogin/></button>
                    </>}
            </>
            : <></>}
    </div>

}

export default Navbar

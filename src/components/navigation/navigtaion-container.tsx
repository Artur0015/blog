import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, logoutUser } from '../../redux/reducers/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { mstpGetAuthenticationStatus, mstpGetUserPhoto, mstpGetUserUsername } from '../../redux/selectors/auth-selector'
import Navigation from './navigation'

type mapStateToPropsType = {
    isAuthenticated: boolean
    photo: string
    username: string
}


type MapDispatchToPropsType = {
    getUserInfo: () => void
    logoutUser: () => void
}

type propsType = mapStateToPropsType & MapDispatchToPropsType

function NavigationContainer(props: propsType) {
    useEffect(() => {
        props.getUserInfo()
    }, [])

    function handleLogoutClick() {
        props.logoutUser()
    }

    return <Navigation isAuthenticated={props.isAuthenticated}
        photo={props.photo}
        username={props.username}
        handleLogoutClick={handleLogoutClick} />
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuthenticated: mstpGetAuthenticationStatus(state),
    photo: mstpGetUserPhoto(state),
    username: mstpGetUserUsername(state)
})


export const NavigationContainerConnecter = connect(mapStateToProps, {
    getUserInfo,
    logoutUser
})(NavigationContainer)
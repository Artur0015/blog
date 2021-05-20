import {UserSubscriptionsType} from "../../common-types";
import UserPhoto from "../tools/UserPhoto";
import s from './subscribed-users.module.scss'
import {Link} from "react-router-dom";
import ButtonPopup from "../tools/popup/Popup";
import {memo} from "react";

type PropsType = {
    user: UserSubscriptionsType
    subscribe: (username: string) => void
    unsubscribe: (username: string) => void
}

const User = memo(({user, subscribe, unsubscribe}: PropsType) => {
    function handleSubscribe() {
        subscribe(user.username)
    }

    function handleUnsubscribe() {
        unsubscribe(user.username)
    }

    return <>
        <div className={s.user}>
            <Link to={`/profile/${user.username}`}>
                <div className={s.link}>
                    <UserPhoto photo={user.photo} round/>
                    <span>{user.username}</span>

                </div>
            </Link>
            {user.isSubscribed
                ? <ButtonPopup questionText={'Are you sure that you want to stop following this author?'}
                               acceptText={'Unsubscribe'} onAccept={handleUnsubscribe} buttonText={'Subscribed'}
                               buttonClassName={s.subBtn + ' grey-btn'}
                />
                : <button onClick={handleSubscribe} className={s.subBtn + ' blue-btn'}>Subscribe</button>}
        </div>
    </>
})

export default User
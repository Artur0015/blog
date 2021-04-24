import {CSSProperties} from "react";

type PropsType = {
    photo: string | null | undefined
    round?: boolean
    halfRound?: boolean
    style?: CSSProperties
    className?: string
    handleClick?: (ev: React.MouseEvent<HTMLImageElement>) => void
}

const anonymPhoto = process.env.REACT_APP_ANONYM_USER_URL

function UserPhoto({round, halfRound, photo, className, ...props}: PropsType) {
    let style: CSSProperties = {}

    if (round) {
        style.borderRadius = '50%'
    } else if (halfRound) {
        style.borderRadius = 12
    }

    if (props.style) {
        style = {...style, ...props.style}
    }

    return <img src={photo ? photo : anonymPhoto} alt="user" style={style}
                className={className} {...props.handleClick ? {onClick: props.handleClick} : null}/>

}

export default UserPhoto
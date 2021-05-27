import s from './popup.module.scss'
import BackgroundCloser from "../background-closer/BackgroundCloser";
import {CSSProperties, useState} from "react";


type PropsType = {
    questionText: string
    acceptText: string
    onAccept: () => void
    buttonClassName?: string
    buttonStyles?: CSSProperties
    buttonText: string | JSX.Element
}

function ButtonPopup({questionText, onAccept, acceptText, buttonClassName, buttonStyles, buttonText}: PropsType) {
    const [isOpen, setOpen] = useState(false)

    function handleAccept() {
        onAccept()
        closePopup()
    }

    function closePopup() {
        setOpen(false)
    }

    const button = <button className={buttonClassName} style={buttonStyles}
                           onClick={() => setOpen(true)}>{buttonText}</button>

    return isOpen
        ? <>
            {button}
            <div className={s.popup}>
                <div className={s.question}>
                    <span>{questionText}</span>
                </div>
                <div className={s.buttons}>
                    <button onClick={closePopup}>Cancel</button>
                    <button onClick={handleAccept}>{acceptText}</button>
                </div>
            </div>
            <BackgroundCloser onClick={closePopup}/>
        </>
        : button
}

export default ButtonPopup
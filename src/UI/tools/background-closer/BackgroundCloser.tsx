import s from './closer.module.scss'

type PropsType = {
    onClick?: () => void
}
function BackgroundCloser({onClick}: PropsType) {
    return <div className={s.closer} onClick={onClick}/>
}

export default BackgroundCloser
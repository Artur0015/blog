import s from './preloader.module.scss'

function Preloader({notInCenter}: {notInCenter?: boolean}) {
    const spinner = <div className={s.preloader}>
        <div/>
        <div/>
        <div/>
    </div>

    return notInCenter ? spinner : <div className={s.wrapper}>{spinner}</div>
}

export default Preloader
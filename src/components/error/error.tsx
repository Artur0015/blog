import Photo from './error-photo.jpg'
import s from './error.module.css'


function Error() {
    return <div className={s.block}>
        <img src={Photo} alt="not found" className={s.img}/>
    </div>
}

export default Error
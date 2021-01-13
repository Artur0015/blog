import React from 'react'
import preloader from './preloadimg.gif'

const Preloader = () => {
    return <img src={preloader} alt='preloader' style={{ display: "block" }} />
}

export default Preloader
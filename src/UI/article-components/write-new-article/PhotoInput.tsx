import s from "./write.module.scss";
import {IoMdTrash} from "react-icons/all";
import React, {ChangeEvent, useRef} from "react";

type PropsType = {
    currentPhoto: File | null
    addPhoto: (photo: File) => void
    deletePhoto: () => void
}

function PhotoInput({currentPhoto, addPhoto, deletePhoto}: PropsType) {
    const inputRef = useRef<HTMLInputElement>(null)

    let currentPhotoURL = ''
    if (currentPhoto) {
        currentPhotoURL = URL.createObjectURL(currentPhoto)
    }

    function handlePhotoAdd(ev: ChangeEvent<HTMLInputElement>) {
        if (ev.target.files?.length) {
            addPhoto(ev.target.files[0])
        }
    }

    function clickFileInput() {
        inputRef.current?.click()
    }

    function handleDeletePhoto() {
        URL.revokeObjectURL(currentPhotoURL)
        deletePhoto()
    }

    return <div className={s.photo} {...(currentPhotoURL ? {} : {onClick: clickFileInput})}>
        {currentPhotoURL
            ? <>
                <img alt="chosen photo" src={currentPhotoURL}/>
                <button onClick={handleDeletePhoto}><IoMdTrash color={'white'} size={15}/>
                </button>
            </>
            : <>
                <input type="file" onChange={handlePhotoAdd} style={{display: 'none'}} accept={'image/*'}
                       ref={inputRef}/>
                <p>Photo for article</p>
            </>
        }
    </div>
}

export default PhotoInput
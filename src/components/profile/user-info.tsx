import React from "react";
import {ChangeEvent, useRef, useState} from "react";
import s from './profile.module.css'
import {FullProfileType} from "../../redux/common-types";
import {Button} from "@material-ui/core";


type PropsType = {
    changeAboutMe: (text: string) => void
    user: FullProfileType
    isOwner: boolean
    setPhoto: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

function UserInfo({changeAboutMe, user, isOwner, setPhoto}: PropsType) {
    const [text, setText] = useState(user.aboutMe)
    const [isEditMode, changeEditModeTo] = useState(false)
    const imageInputRef = useRef<HTMLInputElement | null>(null)

    function clickFileInput() {
        if (imageInputRef.current) {
            imageInputRef.current.click()
        }
    }

    function activateEditMode() {
        if (isOwner) {
            changeEditModeTo(true)
        }
    }

    function dropChanges() {
        setText(user.aboutMe)
        changeEditModeTo(false)
    }

    function saveChanges() {
        changeAboutMe(text)
        changeEditModeTo(false)
    }

    function handleTextChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        setText(ev.target.value)
    }


    return <div className={s.small + ' ' + s.big}>
        <div className={s.image_space}>
            <img src={user.photo} className={s.photo}/>
            <input type="file" style={{display: 'none'}} ref={imageInputRef} onChange={setPhoto}/>
            {isOwner && <Button variant={'outlined'} onClick={clickFileInput}>Upload</Button>}
        </div>
        <textarea disabled={!isEditMode}
                          placeholder={!isEditMode ? user.aboutMe || 'User didn\'t tell anything about himself' : ''}
                          value={text}
                          onChange={handleTextChange}/>
        {isOwner &&
        (isEditMode
            ? <>
                <Button onClick={saveChanges}>Save</Button>
                <Button onClick={dropChanges}>Cancel</Button>
            </>

            : <Button onClick={activateEditMode}>Edit</Button>)}

    </div>
}

// return
// <>
// <div className={s.image_space}>
// <img src={user.photo} alt="photo"/>
// {isOwner && <>
// <button onClick={clickFileInput}>Upload image</button>
// <input type="file" style={{display: 'none'}} ref={imageInputRef} onChange={setPhoto}/>
// </>}
// </div>
// <div className={s.about}>
// {isEditMode
//             ? <textarea value={text} onChange={handleTextChange} onDoubleClick={dropChanges} onKeyPress={ev => {
//                 if (ev.key === 'Enter') {
//                     saveChanges()
//                 }
//             }}/>
//             : <p onDoubleClick={activateEditMode}>{user.aboutMe || 'User didn\'t tell anything about himself'}</p>
//         }
//     </div>
// </>
// }

export default UserInfo



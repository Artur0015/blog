import {ChangeEvent, RefObject, useState} from "react";
import TextareaAutosize from "react-textarea-autosize";


type PropsType = {
    saveChanges: (text: string) => void
    isOwner: boolean
    defaultText: string
    emptyText?: string
    mainDivClassName?: string
    saveButtonClassName?: string
    cancelButtonClassName?: string
    editButtonClassName?: string
    pClassName?: string
    textareaClassName?: string
    validate?: (text: string) => boolean
    editButtonRef?: RefObject<HTMLButtonElement>
}


function EditableTextarea({saveChanges, defaultText, isOwner, ...props}: PropsType) {
    const [isEditMode, setEditMode] = useState(false)
    const [text, setText] = useState(defaultText)

    function handleTextChange(ev: ChangeEvent<HTMLTextAreaElement>) {
        if (props.validate) { // if validation function exists
            if (props.validate(ev.target.value)) setText(ev.target.value)
        } else {
            setText(ev.target.value)
        }
    }

    function activateEditMode() {
        setEditMode(true)
    }

    function handleSave() {
        saveChanges(text)
        setEditMode(false)
    }

    function cancelEditing() {
        setEditMode(false)
        setText(defaultText)
    }

    return <div className={props.mainDivClassName}>
        {isEditMode
            ? <>
                <TextareaAutosize value={text} onChange={handleTextChange} className={props.textareaClassName}/>
                <button className={props.saveButtonClassName} onClick={handleSave}>Save</button>
                <button className={props.cancelButtonClassName} onClick={cancelEditing}>Cancel</button>
            </>
            : <>
                <p className={props.pClassName}>{text ? text : props.emptyText}</p>
                {isOwner &&
                <button className={props.editButtonClassName} onClick={activateEditMode}
                        ref={props.editButtonRef}>Edit</button>}
            </>}
    </div>
}


export default EditableTextarea
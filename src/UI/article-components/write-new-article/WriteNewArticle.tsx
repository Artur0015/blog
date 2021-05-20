import {useHistory} from "react-router";
import s from "./write.module.scss";
import React, {useState} from "react";
import {useAppDispatch} from "../../../BLL/store";
import {addArticle} from "../../../BLL/slices/article-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../../BLL/selectors";
import {Redirect} from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'
import {Formik, FormikHelpers, Form, Field, ErrorMessage} from "formik";
import {ArticleBodyType} from "../../../common-types";
import PhotoInput from "./PhotoInput";
import * as Yup from 'yup'


const initialValues: ArticleBodyType = {
    header: '',
    text: '',
}

const validationSchema = Yup.object({
    header: Yup.string().required('Article must have a header').min(10),
    text: Yup.string().required('Article must have a text').min(300),
})


function WriteNewArticle() {
    const [currentPhoto, setCurrentPhoto] = useState<File | null>(null)

    const history = useHistory()

    const dispatch = useAppDispatch()
    const user = useSelector(currentUserSelector)

    async function handleSubmit(values: ArticleBodyType, {setSubmitting}: FormikHelpers<ArticleBodyType>) {
        setSubmitting(true)
        if (currentPhoto) {
            values.photo = currentPhoto
        }
        const newArticleId = (await dispatch(addArticle(values)).then(unwrapResult)).id
        history.push(`/article/${newArticleId}`)
    }

    async function handlePhotoAdd(photo: File) {
        setCurrentPhoto(photo)
    }

    function handlePhotoDelete() {
        setCurrentPhoto(null)
    }

    if (!user.isAuthenticated) {
        return <Redirect to={'/'}/>
    }

    return <>
        <h1 className={s.header}>New Article</h1>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {formik => (
                <Form className={s.form}>
                    <div className={s.field}>
                        <label htmlFor="header">Header</label>
                        <Field name={'header'} style={{maxWidth: '900px'}} className={'blue-input'} maxLength={120}/>
                        <ErrorMessage name={'header'}>{(msg: string) => <span>{msg}</span>}</ErrorMessage>
                    </div>
                    <div className={s.field}>
                        <label htmlFor="text">Text</label>
                        <Field name={'text'} as={TextareaAutosize} className={'blue-input'}/>
                        <ErrorMessage name={'text'}>{(msg: string) => <span>{msg}</span>}</ErrorMessage>
                    </div>
                    <PhotoInput addPhoto={handlePhotoAdd} deletePhoto={handlePhotoDelete} currentPhoto={currentPhoto}/>
                    <button type={'submit'} className={'blue-btn'}
                            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>SAVE
                    </button>
                </Form>)}
        </Formik>
    </>
}

export default WriteNewArticle
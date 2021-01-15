import {useDispatch, useSelector} from "react-redux"
import {articleType} from "../../redux/reducers/reducer-types"
import {mstpGetUserUsername} from "../../redux/selectors/auth-selector"
import {useHistory} from "react-router";
import {dispatchType} from "../../redux/redux-store";
import {actionsType, addArticle} from "../../redux/reducers/article-reducer";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import s from "./write.module.css";
import React from "react";


const validationSchema = Yup.object({
    header: Yup.string().required(),
    text: Yup.string().required().min(20)
})

const initialValues = {
    header: '',
    text: ''
}


function Write() {
    const dispatch = useDispatch<dispatchType<actionsType>>()
    const history = useHistory()
    const username = useSelector(mstpGetUserUsername)


    async function handleSubmit(values: articleType) {
        const article = {
            header: values.header,
            text: values.text,
            author: username
        }
        await dispatch(addArticle(article))
        history.push('/menu')

    }

    return (
        <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}>
            {formik => (
                <Form className={s.form}>
                    <h1>New Article</h1>
                    <label htmlFor='header'>Article header</label>
                    <Field name="header" />
                    <ErrorMessage name='header'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <label>Article content</label>
                    <Field name='text' as='textarea' />
                    <ErrorMessage name='text'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <button disabled={false}>Save</button>

                </Form>)}
        </Formik>)
}

export default Write
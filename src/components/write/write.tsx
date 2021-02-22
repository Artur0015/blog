import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router";
import {DispatchType} from "../../redux/common-types";
import {ActionsType, addArticle} from "../../redux/reducers/article-reducer";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import s from "./write.module.css";
import React from "react";
import {getCurrentUserSelector} from "../../redux/selectors";


const validationSchema = Yup.object({
    header: Yup.string().required(),
    text: Yup.string().required().min(5)
})

const initialValues = {
    header: '',
    text: ''
}


function Write() {
    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const history = useHistory()
    const user = useSelector(getCurrentUserSelector)


    async function handleSubmit(values: typeof initialValues) {
        if(user.isAuthenticated) {
            const article = {
                header: values.header,
                text: values.text,
                author: user.username
            }
            await dispatch(addArticle(article))
            history.push('/menu')
        }
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
                    <button>Save</button>

                </Form>)}
        </Formik>)
}

export default Write
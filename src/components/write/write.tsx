import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'
import s from './write.module.css'
import * as Yup from 'yup'
import {articleType} from "../../redux/reducers/reducer-types";


const validationSchema = Yup.object({
    header: Yup.string().required(),
    text: Yup.string().required().min(20)
})

const initialValues = {
    header: '',
    text: ''
}

type propsType = {
    handleSubmit: (values: articleType) => void
}

function Write(props: propsType) {
    return (
        <Formik validationSchema={validationSchema}
            initialValues={initialValues}
        onSubmit={props.handleSubmit}>
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
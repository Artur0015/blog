import { ErrorMessage, Field, Form, Formik } from 'formik'
import s from '../login/login.module.css'
import * as Yup from 'yup'
import {userCredentialsType} from "../../redux/reducers/reducer-types";

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Passwod is required'),
    passwordConfirmation: Yup.string().required('You must confirm password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

type propsType = {
    handleSubmit: (values: userCredentialsType, ev: any) => void
}

function Signup(props: propsType) {
    return <>
        <div className={s.div} />
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.handleSubmit}>
            {formik => (
                <Form className={s.form}>
                    <h1>Sign up</h1>
                    <Field placeholder='Username' className={s.input} name='username' />
                    <ErrorMessage name='username' >{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Password' className={s.input} name='password' type='password' />
                    <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Repeat Password' className={s.input} name='passwordConfirmation' type='password'  />
                    <ErrorMessage name='passwordConfirmation'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Sign up</button>
                </Form>
            )}
        </Formik>
    </>
}

export default Signup
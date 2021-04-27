import {useHistory, Redirect, Link} from "react-router-dom";
import React from "react";
import {FormikHelpers, Formik, Form, Field, ErrorMessage} from "formik";
import s from "./login-signup.module.scss";
import * as Yup from "yup";
import {useAppDispatch} from "../../BLL/store";
import {loginUser} from "../../BLL/slices/auth-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../BLL/selectors";
import {CredentialsType} from "../../common-types";


const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

const initialValues: CredentialsType = {
    username: '',
    password: '',
}

function Login() {
    const history = useHistory()

    const dispatch = useAppDispatch()
    const user = useSelector(getCurrentUserSelector)

    async function handleSubmit(credentials: CredentialsType, {
        setErrors,
        setSubmitting
    }: FormikHelpers<CredentialsType>) {
        setSubmitting(true)
        try {
            await dispatch(loginUser(credentials)).then(unwrapResult)
            history.push('/')
        } catch (e) {
            setErrors({password: 'Invalid Credentials'})
        } finally {
            setSubmitting(false)
        }
    }

    if (user.isAuthenticated) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.formContainer}>
            <div className={s.wrapper}>
                <h1>Log in</h1>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {formik => (
                        <Form>
                            <div className={s.field}>
                                <label htmlFor="username">Username</label>
                                <Field name={'username'}/>
                                <ErrorMessage name={'username'}>{(msg: string) => <span>{msg}</span>}</ErrorMessage>
                            </div>

                            <div className={s.field}>
                                <label htmlFor="password">Password</label>
                                <Field type='password' name={'password'}/>
                                <ErrorMessage name={'password'}>{(msg: string) => <span>{msg}</span>}</ErrorMessage>
                            </div>
                            <button type='submit' className={'blue-btn'}
                                    disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Log in
                            </button>
                        </Form>)}
                </Formik>
                <p>Have no account yet? <Link to={'/signup'}>Sign up</Link></p>
            </div>
        </div>)
}


export default Login
import {Redirect, Link} from "react-router-dom";
import * as Yup from "yup";
import s from "./login-signup.module.scss";
import {FormikHelpers, Formik, Form, Field, ErrorMessage} from "formik";
import React from "react";
import {useAppDispatch} from "../../BLL/store";
import {signupUser} from "../../BLL/slices/auth-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../BLL/selectors";
import {useHistory} from "react-router";


const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(6).max(12)
        .matches(/^[a-zA-Z0-9_]*$/, {message: 'Unacceptable symbols are used'}),
    password: Yup.string().required('Password is required').min(8).max(16),
    passwordConfirmation: Yup.string().required('You must confirm password')
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

type SignupCredentialsType = typeof initialValues

function Signup() {
    const history = useHistory()

    const dispatch = useAppDispatch()
    const user = useSelector(currentUserSelector)

    function validatePassword(password: string) {
        if (/^\d+$/.test(password)) return 'Password must include letters'
    }

    async function handleSubmit(data: SignupCredentialsType, {
        setErrors,
        setSubmitting
    }: FormikHelpers<SignupCredentialsType>) {
        setSubmitting(true)
        try {
            await dispatch(signupUser(data)).then(unwrapResult)
            history.push('/login')
        } catch (e) {
            setErrors({username: 'User with such username already exists'})
        } finally {
            setSubmitting(false)
        }
    }

    if (user.isAuthenticated) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.formContainer + ' ' + s.signup}>
            <div className={s.wrapper}>
                <h1>Sign up</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {formik => (
                        <Form>
                            <div className={s.field}>
                                <label htmlFor="username">Username</label>
                                <Field name={'username'}/>
                                <ErrorMessage name={'username'}>{msg => <span>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={s.field}>
                                <label htmlFor="password">Password</label>
                                <Field name={'password'} type={'password'} validate={validatePassword}/>
                                <ErrorMessage name={'password'}>{msg => <span>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={s.field}>
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
                                <Field name={'passwordConfirmation'} type={'password'} validate={validatePassword}/>
                                <ErrorMessage name={'passwordConfirmation'}>{msg => <span>{msg}</span>}</ErrorMessage>
                            </div>
                            <button type='submit' className={'blue-btn'}
                                    disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Sign up
                            </button>
                        </Form>)}
                </Formik>
                <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
            </div>
        </div>
    )
}

export default Signup
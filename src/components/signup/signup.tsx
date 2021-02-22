import {useDispatch} from 'react-redux'
import {ActionsType, signupUser} from "../../redux/reducers/auth-reducer"
import {useHistory} from "react-router-dom";
import {SignupCredentialsType} from '../../redux/common-types'
import {DispatchType} from "../../redux/common-types";
import * as Yup from "yup";
import s from "../login/login.module.css";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {statusCodes} from "../../DAL/response-status-codes";
import React from "react";

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(5).max(12),
    password: Yup.string().required('Password is required').min(8).max(16),
    passwordConfirmation: Yup.string().required('You must confirm password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})


function Signup() {
    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const history = useHistory()


    async function handleSubmit(values: SignupCredentialsType, ev: FormikHelpers<typeof initialValues>) {
        const statusCode = await dispatch<Promise<number>>(signupUser({
            username: values.username,
            password: values.password
        }))
        if (statusCode === statusCodes.BAD_REQUEST) {
            ev.setErrors({username: 'Username is already taken'})
        } else if (statusCode === statusCodes.CREATED) {
            history.push('/login')
        }
    }


    function validate(values: SignupCredentialsType) {
        const errors = {} as SignupCredentialsType
        let key: keyof typeof values
        for (key in values) {
            if (values[key].includes(' ')) {
                errors[key] = 'Spaces are not available'
            }
        }
        return errors
    }

    function validatePassword(password: string) {
        if (new Set(password).size < 5) {
            return 'Password is too easy'
        }
    }

    return <>
        <div className={s.div}/>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}
                validate={validate}>
            {formik => (
                <Form className={s.form}>
                    <h1>Sign up</h1>
                    <Field placeholder='Username' className={s.input} name='username'/>
                    <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Password' className={s.input} name='password' type='password'
                           validate={validatePassword}/>
                    <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Repeat Password' className={s.input} name='passwordConfirmation'
                           type='password'/>
                    <ErrorMessage name='passwordConfirmation'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <button>Sign up</button>
                </Form>
            )}
        </Formik>
    </>
}

export default Signup
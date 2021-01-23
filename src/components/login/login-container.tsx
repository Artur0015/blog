import {useHistory} from "react-router-dom";
import {userCredentialsType} from "../../redux/reducers/reducer-types";
import {useDispatch} from "react-redux";
import {actionsType, loginUser} from "../../redux/reducers/auth-reducer";
import {dispatchType} from "../../redux/redux-store";
import React from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import s from "./login.module.css";
import * as Yup from "yup";
import {statusCodes} from "../../DAL/response-status-codes";


export interface loginValuesType extends userCredentialsType {
    rememberMe: boolean
}

let initialValues = {
    username: '',
    password: '',
    rememberMe: false
}

let validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})


function LoginContainer() {
    const history = useHistory()
    const dispatch = useDispatch<dispatchType<actionsType>>()


    async function handleSubmit(values: userCredentialsType, ev: FormikHelpers<loginValuesType>) {
        const statusCode = await dispatch(loginUser(values))
        if (statusCode === statusCodes.UNAUTHORIZED) {
            ev.setErrors({password: "Invalid Credentials"})
            ev.setSubmitting(false)
        } else if (statusCode === statusCodes.OK) {
            history.push('/menu')
        }
    }

    return <>
        <div className={s.div}/>
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            {(formik) => (<Form className={s.form}>
                <h1>Log in</h1>
                <Field placeholder='Username' className={s.input} name='username'/>
                <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field placeholder='Password' className={s.input} name='password' type='password'/>
                <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field type='checkbox' className={s.checkbox} name='rememberMe'/>
                <label>Remember me</label>
                <button type='submit' disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Log in
                </button>
            </Form>)
            }
        </Formik>
    </>
}


export default LoginContainer
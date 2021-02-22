import {useHistory} from "react-router-dom";
import {UserCredentialsType} from "../../redux/common-types";
import {useDispatch} from "react-redux";
import {ActionsType, loginUser} from "../../redux/reducers/auth-reducer";
import {DispatchType} from "../../redux/common-types";
import React from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import s from "./login.module.css";
import * as Yup from "yup";
import {statusCodes} from "../../DAL/response-status-codes";


export interface loginValuesType extends UserCredentialsType {
    rememberMe: boolean
}

const initialValues = {
    username: '',
    password: '',
    rememberMe: false
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})


function Login() {

    const history = useHistory()
    const dispatch = useDispatch<DispatchType<ActionsType>>()

    async function handleSubmit(values: UserCredentialsType, {setErrors}: FormikHelpers<loginValuesType>) {
        const status = await dispatch(loginUser(values))
        if(status === statusCodes.OK) {
            history.push('/menu')
        } else {
            setErrors({password: 'Invalid credentials'})
        }
    }


    return <div className={s.div}>
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
                <button type='submit'>Log in
                </button>
            </Form>)
            }
        </Formik>
    </div>
}


export default Login
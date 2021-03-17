import {useDispatch} from 'react-redux'
import {ActionsType, signupUser} from "../../redux/reducers/auth-reducer"
import {useHistory} from "react-router-dom";
import {CredentialsType} from '../../redux/common-types'
import {DispatchType} from "../../redux/common-types";
import * as Yup from "yup";
import s from "../login/signup-login.module.css";
import {FormikHelpers, useFormik} from "formik";
import {statusCodes} from "../../DAL/response-status-codes";
import React from "react";
import {Button, TextField} from "@material-ui/core";


type SignupCredentialsType = CredentialsType & {
    passwordConfirmation: string
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(5).max(12),
    password: Yup.string().required('Password is required').min(8).max(16),
    passwordConfirmation: Yup.string().required('You must confirm password')
        .oneOf([Yup.ref('password')], 'Passwords must match')
})


function Signup() {
    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const history = useHistory()


    async function handleSubmit(values: SignupCredentialsType, {
        setSubmitting,
        setErrors
    }: FormikHelpers<SignupCredentialsType>) {
        setSubmitting(true)
        const statusCode = await dispatch<Promise<number>>(signupUser({
            username: values.username,
            password: values.password
        }))
        if (statusCode === statusCodes.BAD_REQUEST) {
            setErrors({username: 'Username is already taken'})
        } else if (statusCode === statusCodes.CREATED) {
            history.push('/login')
        }
        setSubmitting(false)
    }

    const formik = useFormik<SignupCredentialsType>({
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    })


    return (
        <form className={s.form + ' ' + s.signupHeight} onSubmit={formik.handleSubmit}>
            <h1>Sign up</h1>
            <TextField fullWidth label={'Username'} variant={'outlined'} name={'username'}
                       value={formik.values.username}
                       onChange={formik.handleChange} helperText={formik.touched.username && formik.errors.username}
                       error={formik.touched.username && !!formik.errors.username} onBlur={formik.handleBlur}/>
            <TextField style={{marginTop: 35}} fullWidth label={'Password'} variant={'outlined'} name={'password'}
                       value={formik.values.password} onChange={formik.handleChange} type={'password'}
                       helperText={formik.touched.password && formik.errors.password}
                       error={formik.touched.password && !!formik.errors.password} onBlur={formik.handleBlur}/>
            <TextField style={{marginTop: 35}} fullWidth label={'Confirm password'} variant={'outlined'}
                       name={'passwordConfirmation'} type={'password'}
                       value={formik.values.passwordConfirmation} onChange={formik.handleChange}
                       helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                       error={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                       onBlur={formik.handleBlur}/>
            <Button color={'primary'} variant={'contained'} fullWidth type={'submit'}
                    disabled={!formik.isValid || formik.isSubmitting}>Sign up</Button>
        </form>
    )
}

export default Signup
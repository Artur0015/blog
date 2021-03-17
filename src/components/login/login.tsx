import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActionsType, loginUser} from "../../redux/reducers/auth-reducer";
import {CredentialsType, DispatchType} from "../../redux/common-types";
import React from "react";
import {FormikHelpers, useFormik} from "formik";
import s from "./signup-login.module.css";
import * as Yup from "yup";
import {statusCodes} from "../../DAL/response-status-codes";
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";


export type LoginCredentialsType = CredentialsType & {
    rememberMe: boolean
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})


function Login() {

    const history = useHistory()
    const dispatch = useDispatch<DispatchType<ActionsType>>()


    async function handleSubmit(values: LoginCredentialsType, {
        setErrors,
        setSubmitting,
    }: FormikHelpers<LoginCredentialsType>) {
        setSubmitting(true)
        const status = await dispatch(loginUser(values))
        if (status === statusCodes.OK) {
            history.push('/')
        } else {
            setErrors({password: 'Invalid credentials'})
        }
        setSubmitting(false)
    }

    const formik = useFormik<LoginCredentialsType>({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    })


    return (<form className={s.form + ' ' + s.loginHeight} onSubmit={formik.handleSubmit}>
        <h1>Log in</h1>
        <TextField fullWidth label={'Username'} variant={'outlined'} name={'username'} value={formik.values.username}
                   onChange={formik.handleChange} helperText={formik.touched.username && formik.errors.username}
                   error={formik.touched.username && !!formik.errors.username} onBlur={formik.handleBlur}/>
        <TextField style={{marginTop: 35}} fullWidth label={'Password'} name={'password'} variant={'outlined'}
                   value={formik.values.password} onChange={formik.handleChange} type={'password'}
                   helperText={formik.touched.password && formik.errors.password}
                   error={formik.touched.password && !!formik.errors.password} onBlur={formik.handleBlur}/>
        <FormControlLabel
            style={{marginTop: 20}}
            control={<Checkbox name={'rememberMe'} onChange={formik.handleChange} color="primary"/>}
            label="Remember me"/>
        <Button color={'primary'} variant={'contained'} fullWidth type={'submit'}
                disabled={!formik.isValid || formik.isSubmitting}>Log in</Button>
    </form>)

}


export default Login
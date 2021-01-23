import {useDispatch} from 'react-redux'
import {actionsType, signupUser} from "../../redux/reducers/auth-reducer"
import { useHistory } from "react-router-dom";
import {userCredentialsType} from '../../redux/reducers/reducer-types'
import {dispatchType} from "../../redux/redux-store";
import * as Yup from "yup";
import s from "../login/login.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {statusCodes} from "../../DAL/response-status-codes";


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


function SignupContainer() {
    const dispatch = useDispatch<dispatchType<actionsType>>()
    const history = useHistory()


    async function handleSubmit(values: userCredentialsType, ev: any) {
        console.log('in handle submit');

        let statusCode = await dispatch<Promise<number>>(signupUser({username: values.username, password: values.password}))
        if (statusCode === statusCodes.CONFLICT) {
            ev.setErrors({username: 'Username is already taken'})
        } else if (statusCode === statusCodes.CREATED) {
            history.push('/login')
        }

    }

    return <>
        <div className={s.div}/>
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            {formik => (
                <Form className={s.form}>
                    <h1>Sign up</h1>
                    <Field placeholder='Username' className={s.input} name='username'/>
                    <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Password' className={s.input} name='password' type='password'/>
                    <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <Field placeholder='Repeat Password' className={s.input} name='passwordConfirmation'
                           type='password'/>
                    <ErrorMessage name='passwordConfirmation'>{msg => <span>{msg}</span>}</ErrorMessage>
                    <button disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Sign up</button>
                </Form>
            )}
        </Formik>
    </>
}
export default SignupContainer
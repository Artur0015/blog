import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik'
import s from './login.module.css'
import * as Yup from 'yup'
import { userCredentialsType } from "../../redux/reducers/reducer-types";

let initialValues = {
    username: '',
    password: '',
    rememberMe: false
}

let validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})




interface loginValuesType extends userCredentialsType{
    rememberMe: boolean
}

type propsType = {
    handleSubmit: (values: userCredentialsType, event: FormikHelpers<loginValuesType>) => Promise<void>
}

function Login(props: propsType) {
    return <>

        <div className={s.div} />
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.handleSubmit}>
            {(formik) => (<Form className={s.form} >
                <h1>Log in</h1>
                <Field placeholder='Username' className={s.input} name='username' />
                <ErrorMessage name='username'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field placeholder='Password' className={s.input} name='password' type='password' />
                <ErrorMessage name='password'>{msg => <span>{msg}</span>}</ErrorMessage>
                <Field type='checkbox' className={s.checkbox} name='rememberMe' />
                <label>Remember me</label>
                <button type='submit' disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Log in</button>
            </Form>)
            }
        </Formik >
    </>

}

export default Login
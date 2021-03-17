import {useDispatch} from "react-redux"
import {useHistory} from "react-router";
import {ArticleBodyType, DispatchType} from "../../redux/common-types";
import {ActionsType, addArticle} from "../../redux/reducers/article-reducer";
import * as Yup from "yup";
import {FormikHelpers, useFormik} from "formik";
import s from "./write.module.css";
import React from "react";
import {Button, TextField} from "@material-ui/core";

const validationSchema = Yup.object({
    header: Yup.string().required().max(80).min(10),
    text: Yup.string().required().min(300)
})


function Write() {
    const dispatch = useDispatch<DispatchType<ActionsType>>()
    const history = useHistory()

    async function handleSubmit(values: ArticleBodyType, {setSubmitting}: FormikHelpers<ArticleBodyType>) {
        setSubmitting(true)
        const article = {
            header: values.header,
            text: values.text
        }
        const articleId = await dispatch(addArticle(article))
        if (!(articleId === 'error')) history.push('/article/' + articleId)
    }

    const formik = useFormik<ArticleBodyType>({
        initialValues: {
            header: '',
            text: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    })

    return (
        <>
            <h1 className={s.h1}>New Article</h1>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <TextField name={'header'} label={'Header'} value={formik.values.header} onChange={formik.handleChange}
                           helperText={formik.touched.header && formik.errors.header}
                           error={formik.touched.header && !!formik.errors.header} onBlur={formik.handleBlur}/>
                <TextField multiline fullWidth name={'text'} label={'Text'} value={formik.values.text}
                           onChange={formik.handleChange}
                           helperText={formik.touched.text && formik.errors.text}
                           error={formik.touched.text && !!formik.errors.text} onBlur={formik.handleBlur}/>
                <Button color={'primary'} variant={'outlined'} disabled={!formik.isValid || formik.isSubmitting}
                        type={'submit'}>Save</Button>

            </form>
        </>)
}

export default Write
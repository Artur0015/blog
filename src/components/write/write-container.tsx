import {connect, ConnectedProps} from "react-redux"
import {articleType} from "../../redux/reducers/reducer-types"
import {mstpGetUserUsername} from "../../redux/selectors/auth-selector"
import Write from "./write"
import {useHistory} from "react-router";
import {AppStateType} from "../../redux/redux-store";
import { addArticle} from "../../redux/reducers/article-reducer";


type mapStateToPropsType = {
    username: string
}

type mapDispatchToPropsType = {
    addArticle: (article: articleType) => Promise<void>
}

type propsType = mapStateToPropsType & mapDispatchToPropsType


function WriteAPI(props: propsType) {

    let history = useHistory()

    async function handleSubmit(values: articleType) {
        const article = {
            header: values.header,
            text: values.text,
            author: props.username
        }
        await props.addArticle(article)
        history.push('/menu')

    }

    return <Write handleSubmit={handleSubmit}/>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    username: mstpGetUserUsername(state)
})

const WriteContainer = connect(mapStateToProps, {
    addArticle,
})(WriteAPI)


export default WriteContainer
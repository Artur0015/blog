import Post from "./post"
import {articleType} from "../../../redux/reducers/reducer-types";

type propsType ={
    posts: Array<articleType>
}

let Posts = (props: propsType) => {
    let Elements = props.posts.map((article, index) =>
        <Post key={index} id={article.id} header={article.header} text={article.text} author={article.author} />)
    return (Elements)
}



export default Posts
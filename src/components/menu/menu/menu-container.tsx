import {connect, ConnectedProps} from 'react-redux'
import {getArticlesOfPage, thunkType} from '../../../redux/reducers/menu-reducer'
import Menu from './menu'
import React, { useEffect, useState } from 'react'
import Preloader from '../../preloader/preloader'
import { mstpGetPageSize, mstpGetPosts, mstpGetPostsCount } from '../../../redux/selectors/menu-selector'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AppStateType } from '../../../redux/redux-store'
import { articleType } from '../../../redux/reducers/reducer-types'


type mapStateToPropsType = {
    posts: Array<articleType>
    pageSize: number
    postsCount: number
}

type mapDispatchToPropsType = {
    getArticlesOfPage: (page: number) => Promise<void>
}


type propsType = mapStateToPropsType & mapDispatchToPropsType & RouteComponentProps

function MenuAPI(props: propsType) {
    let [isLoading, setLoading] = useState(false)
    const currentPage = parseInt(props.location.search.slice(6)) || 1
    useEffect(() => {
        setLoading(true)
        props.getArticlesOfPage(currentPage).then(() => {
            setLoading(false)
        })
    }, [currentPage])

    function render() {
        let pagesCount = Math.ceil(props.postsCount / props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return isLoading
            ? <Preloader />
            : <Menu postsCount={props.postsCount} pageSize={props.pageSize}
                posts={props.posts} currentPage={currentPage} />
    }

    return render()
}



const MenuAPIWithUrlData = withRouter(MenuAPI)
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    posts: mstpGetPosts(state),
    pageSize: mstpGetPageSize(state),
    postsCount: mstpGetPostsCount(state),
})
// <mapStateToPropsType,mapDispatchToPropsType>
export const MenuContainer = connect(mapStateToProps,
    {
        getArticlesOfPage,
    })(MenuAPIWithUrlData)
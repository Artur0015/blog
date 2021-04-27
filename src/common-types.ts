export type CreateSuccessResponseType = {id: number}

export type ArticleRequestParamsType = {
    currentPage: number
    pageSize?: number
}

export type ArticleBodyType = {
    header: string
    text: string
    photo?: File | null
}

export type CommonArticleType = {
    author?: BaseUserType
    header: string
    id: number
    likes: number
    dislikes: number
    pubDate: string
    photo: string
}

export type ArticlesWithCountType = {
    count: number
    data: Array<CommonArticleType>
}

export type FullArticleType = CommonArticleType & {
    text: string
    isLiked: boolean
    isDisliked: boolean
}

export type CommentType = {
    id: number
    text: string,
    author: BaseUserType
    pubDate: string
}

export type CredentialsType = {
    username: string
    password: string
}

export type BaseUserType = {
    id: number
    username: string
    photo: string | null
}

export type FullUserType = BaseUserType & {
    aboutMe: string
    dateJoined: string
    timesLiked: number
    timesDisliked: number
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type UserEditableFieldsType = AtLeastOne<{ username: string, aboutMe: string, photo: File }> // at least one from username/aboutMe/photo


export type UserType = { isAuthenticated: false } | ({ isAuthenticated: true } & BaseUserType)

export type ProfileType = FullUserType & {
    articles: {
        count: number
        data: Array<CommonArticleType>
    }
}

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

export type UserSubscriptionsType = BaseUserType & {
    isSubscribed: boolean
}

export type FullUserType = UserSubscriptionsType & {
    aboutMe: string
    dateJoined: string
    timesLiked: number
    timesDisliked: number
    subscribers: number
}

export type UserType = { isAuthenticated: false } | ({ isAuthenticated: true } & BaseUserType)

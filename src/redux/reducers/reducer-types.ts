 export type commentType = {
    text: string,
    author: string,
}

export type articleType = {
    id?: number
    header: string
    text: string
    author?: string
    photo?: string
    pubDate?: string
    isOwner?: boolean
}

export type userType = {
    isAuthenticated: boolean
    username: null | string
    photo: null | string
}

export type userCredentialsType = {
    username: string
    password: string
}



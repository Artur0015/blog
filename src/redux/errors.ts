const er = 'Some error occurred. '
const pl = 'Please reload page'
const again = ' and try again'

const errors = {
    articlePullFail: er + 'Failed to load article-page. ' + pl,
    articleLoadFail: er + 'Failed to create article-page. ' + pl + again,
    articleChangeFail: er + 'Failed to change article-page. ' + pl + again,
    articleDeleteFail: er + 'Failed to delete article-page. ' + pl + again,
    commentLoadFail: er + 'Failed to create comment. ' + pl + again,
    commentsPullFail: er + 'Failed to load comments. ' + pl,
    commentDeleteFail: er + 'Failed to delete comment. ' + pl + again,
    putLikeFail: er + 'Failed to put like. ' + pl + again,
    likeDeleteFail: er + 'Failed to delete like. ' + pl + again,
    putDislikeFail: er + 'Failed to put dislike. ' + pl + again,
    dislikeDeleteFail: er + 'Failed to delete dislike. ' + pl + again,

    logoutFail: er + 'Failed to log out. ' + pl,
    userInfoPullFail: er + 'Failed to get information. ' + pl,
    credentialsCompareFail: er + 'Failed to compare credentials. They may be correct. ' + pl,
    signupFail: er + 'Failed to create an account. Username may not be taken' + pl + again,

    articlesPagePullFail: er + 'Failed to load articles. ' + pl,

    profileInfoPullFail: er + 'Failed to load user info. ' + pl,
    profileArticlesPullFail: er + 'Failed to load user articles. ' + pl,
    photoChangeFail: er + 'Failed to load this file. The size may be too big. ',
    infoChangeFail: er + 'Failed to change information about you. ' + pl + again,
}


export default errors
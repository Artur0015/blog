import React from 'react'
import {NavLink} from 'react-router-dom'
import {CommonArticleType} from "../../redux/common-types";
import {Card, CardActionArea, CardContent, Grid, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import s from './menu.module.css'


type PropsType = {
    article: CommonArticleType
    withUsername: boolean
} & ({
    withDelete: true
    deleteArticle: (id: number) => void
} | {
    withDelete: false
})


const Post = ({article, withUsername, ...props}: PropsType) => {
    function handleDelete() {
        if (props.withDelete) {
            props.deleteArticle(article.id)
        }
    }

    return <>
        <Grid item xs={12} md={6} xl={3}>
            <Card className={s.content}>
                <CardActionArea><CardContent style={{paddingBottom: 0}}>


                    <NavLink to={'/article/' + article.id}>
                        <Typography variant={'h4'}>{article.header}</Typography>
                        <Typography variant={'body2'}>{article.pubDate}</Typography>
                        <div className={s.rating}>
                            <ThumbsUpDownIcon/>
                            <p>{article.likes - article.dislikes}</p>
                        </div>
                    </NavLink>
                </CardContent>
                </CardActionArea>
                {(props.withDelete || withUsername) && <div className={s.infoPart}>
                    {props.withDelete && <IconButton onClick={handleDelete}><Delete/></IconButton>}
                    {withUsername && <NavLink to={'/profile/' + article.author}>
                        <Typography variant={'subtitle2'}>By {article.author}</Typography>
                    </NavLink>}
                </div>}


            </Card>
        </Grid>

    </>
}

export default Post
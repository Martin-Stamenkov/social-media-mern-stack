import React, { useEffect } from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import { Spinner } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { PostsList, Form, getPosts, } from 'post'
import { Store } from 'store'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            [theme.breakpoints.between(280, 600)]: {
                flexDirection: "column-reverse"
            }
        },
        formContainer: {
            margin: "14px",
            // width: "50%",
            [theme.breakpoints.between(280, 600)]: {
                width: "90%",
            }
        },
        posts: {
            // display: "flex",
            // flexWrap: "wrap",
            // width: "50%",
            [theme.breakpoints.between(280, 600)]: {
                width: "100%",
            }
        },
    }),
);

export function Home() {
    const [currentId, setCurrentId] = useState(null)
    const { posts, loading, userPosts } = useSelector((state: Store) => state?.postsReducer);
    const { authData } = useSelector((state: any) => state?.authReducer);
    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        if (userPosts.length === 0 && authData) {
            dispatch(getPosts());
        }
    }, [dispatch, userPosts.length])

    return (
        loading ? <Spinner /> : <Box className={classes.root}>
            <Box className={classes.posts}>
                <PostsList setCurrentId={setCurrentId} posts={posts} />
            </Box>
            <Box className={classes.formContainer}>
                <Form setCurrentId={setCurrentId} currentId={currentId} />
            </Box>
        </Box>
    )
}

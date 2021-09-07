import React from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import {  Spinner } from 'components'
import { useSelector } from 'react-redux'
import { PostsList, Form, } from 'post'
import { Store } from 'store'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-around",
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
    const { posts, loading } = useSelector((state: Store) => state?.postsReducer);
    const classes = useStyles()

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

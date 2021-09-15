import React, { ChangeEvent, useEffect } from 'react'
import { Box, Button, createStyles, IconButton, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { useState } from 'react';
import { Spacer } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'store';
import { createNewPost, updatePost } from '../actions';
import { IPost } from 'post/components/Post';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Storage } from 'storage';
import { convertBase64 } from 'utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        container: {
            display: "flex",
            flexDirection: "column",
            padding: "10px 14px 10px 14px",

        },
        inputFile: {
            display: "none"
        },
        image: {
            height: 42,
            width: 52,
            borderRadius: "10%"

        }

    }),
);

interface IForm {
    currentId: any,
    setCurrentId: any
}

export function Form({ currentId, setCurrentId }: IForm) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState<IPost>({
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
        creatorId: ""
    });
    const { postsLoading } = useSelector((state: Store) => state?.postsReducer)
    const post = useSelector((state: Store) => currentId ? state?.postsReducer.posts.find(p => p._id === currentId) : null);
    const isInvalid = (postData.title === "" || postData.message === "" || postData.selectedFile === "");
    const user = JSON.parse(Storage.getItem("profile") || "null")

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!currentId) {
            dispatch(createNewPost({ ...postData, name: user?.result?.name, creatorId: user?.result?._id ? user?.result?._id : user?.result?.googleId }))
        } else {
            dispatch(updatePost(currentId.toString(), { ...postData, name: user?.result?.name }))
        }
        clear();
    }


    const clear = () => {
        setPostData({
            title: "",
            message: "",
            tags: [],
            selectedFile: ""
        })
        setCurrentId(null)
    }

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]
            const base64 = await convertBase64(file)
            setPostData({ ...postData, selectedFile: base64 as string })
        }
    }

    return (
        <form autoComplete="off" noValidate onSubmit={onSubmit} className={classes.root}>
            <Paper className={classes.container}>
                <Box display="flex" justifyContent="center">
                    <Typography>{!currentId ? "Creating a Memory" : "Editing a Memory"}</Typography>
                </Box>
                <TextField
                    id="outlined"
                    label="Title"
                    variant="outlined"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    id="outlined-multiline"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="#Hashtags"
                    maxRows={4}
                    variant="outlined"
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
                />
                <Box display="flex">
                    <input
                        accept="image/*"
                        className={classes.inputFile}
                        id="upload-file"
                        type="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => uploadImage(e)}
                    />
                    <label htmlFor="upload-file">
                        <IconButton aria-label="upload picture" component="span">
                            <CropOriginalIcon />
                        </IconButton>
                    </label>

                    {postData.selectedFile ? <img className={classes.image} src={postData.selectedFile} alt="upload" /> : null}
                </Box>
                <Button disabled={postsLoading || isInvalid} type="submit" variant="contained" color="primary">{!isInvalid ? "Submit" : "Please fill the fields"}</Button>
                <Spacer height={8} />
                <Button onClick={clear} variant="contained" color="secondary">Clear</Button>
            </Paper>
        </form>
    )
}

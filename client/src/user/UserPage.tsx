import React, { useEffect, useState } from 'react'
import { Box, createStyles, Paper, makeStyles, Tab, Tabs, Theme, Typography, TextField } from '@material-ui/core'
import defaultAvatar from "assets/defaultAvatar.png"
import { useSelector } from 'react-redux'
import { IPost, PostsList } from 'post'
import { Spacer, Spinner, ImagesList } from 'components'
import { Store } from 'store'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import { api } from 'auth'
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
import {  useParams } from 'react-router'
import moment from 'moment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
            width: "40%",
            padding: 30
        },
        avatar: {
            width: 250,
            height: 250,
            borderRadius: "50%",
            boxShadow: "3px 0px 18px #2f2a2a",
        },

        imageContainer: {
            display: "flex",
            justifyContent: "center",
        },
        container: {
            background: "linear-gradient(#cacccf, #ffffff)"
        },
        tabs: {
            display: "flex",
            justifyContent: "center"
        },
        joinInfo: {
            marginLeft: 4,
        },
    }),
);

export interface IUser {
        hometown: string | null,
        city: string | null,
        occupation: string | null,
        education: string | null,
        _id: string | null,
        name: string | null,
        email: string | null,
        createdAt: string | null,
        imageUrl: string | undefined,
}

export function UserPage() {
    const { loading, posts } = useSelector((state: Store) => state?.postsReducer);
    const classes = useStyles();
    const { id }: { id: string } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const [user, setUser] = useState<any>(null);

    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        setTabIndex(value);
    };

    const GetUser = async () => {
        const { data } = await api.getUser(id)
        console.log(data)
      await setUser(data)
    }

    useEffect(() => {
        GetUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(user)

    return (
        !user ? <Spinner /> :
            <>
                <Paper className={classes.container}>
                    <Spacer height={40} />
                    <Box className={classes.imageContainer}>
                        <img className={classes.avatar} alt="avatar" src={user.imageUrl || defaultAvatar} />
                    </Box>
                    <Spacer height={20} />
                    <Box display="flex" justifyContent="center">
                        <Typography variant="h5">{user.name}</Typography>
                    </Box>
                    <Box className={classes.tabs}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab icon={<PersonPinIcon />} label="About" />
                            <Tab icon={<PhotoLibraryOutlinedIcon />} label="Posts" />
                            <Tab icon={<PhotoSizeSelectActualOutlinedIcon />} label="Photos" />
                        </Tabs>
                    </Box>
                </Paper>
                <Spacer height={20} />
                {
                    tabIndex === 0 ?
                        <Box display="flex" justifyContent="center">
                            <Paper className={classes.root}>
                                <Box padding="14px">
                                    <Typography color="textSecondary" variant="h6">Additional Info</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column">
                                    <TextField disabled variant="outlined" value={user.hometown || "--"} id="hometown" name="hometown" label="Hometown" />
                                    <TextField disabled variant="outlined" value={user.city || "--"} id="city" name="city" label="Current City" />
                                    <TextField disabled variant="outlined" value={user.education || "--"} id="education" name="education" label="Education" />
                                    <TextField disabled variant="outlined" value={user.occupation || "--"} id="occupation" name="occupation" label="Occupation" />
                                    <Box display="flex" alignItems="center"  >
                                        <AccountCircleIcon color="disabled" />
                                        <Typography className={classes.joinInfo} gutterBottom variant="body2">{`joined: ${moment(user.createdAt).format('ll')}`}</Typography>
                                    </Box>
                                </Box>
                                <Spacer height={8} />
                            </Paper>
                        </Box>
                        : null
                }
                {
                    tabIndex === 1 ?
                        <Box display="flex" justifyContent="center" >
                            {loading ? <Spinner /> :
                                <Box >
                                    <PostsList posts={posts.filter((post: IPost) => post.creatorId === id)} />
                                </Box>
                            }
                        </Box>
                        : null
                }
                {
                    tabIndex === 2 ?
                        <ImagesList posts={posts.filter((post: IPost) => post.creatorId === id)} />
                        : null
                }
            </>
    )
}

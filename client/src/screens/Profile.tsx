import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { Box, createStyles, Paper, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core'
import defaultAvatar from "assets/defaultAvatar.png"
import { useDispatch, useSelector } from 'react-redux'
import { Form, PostsList } from 'post'
import { Spacer, Spinner, ImagesList } from 'components'
import { Store } from 'store'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { convertBase64 } from 'utils'
import CreateIcon from '@material-ui/icons/Create';
import { DetailsForm, uploadUserPhoto } from 'auth'
import { Storage } from 'storage'
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputFile: {
            display: "none"
        },
        inputContainer: {
            position: "absolute",
            top: "300px",
            marginLeft: "158px"
        },
        avatar: {
            width: 250,
            height: 250,
            borderRadius: "50%",
            boxShadow: "3px 0px 18px #2f2a2a",
        },
        iconContainer: {
            borderRadius: 50,
            backgroundColor: "#cac8c8",
            height: 44,
            padding: 4
        },
        uploadImageContainer: {
            display: "flex",
            justifyContent: "center",
            "&:hover": {
                "& $hover": {
                    borderRadius: "50%",
                    display: "block",
                    background: "#cacccf",
                }
            }
        },
        container: {
            background: "linear-gradient(#cacccf, #ffffff)"
        },
        tabs: {
            display: "flex",
            justifyContent: "center"
        },
        hover: {
            background: "#cacccf",
            display: "none",
            height: 250,
            width: 250,
            position: "absolute",
            marginBottom: "-200px",
            opacity: 0.5,
            cursor: "pointer",
        },
        hoverItem: {
            position: "absolute",
            top: 100,
            left: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    }),
);

export function Profile() {
    const { userPosts, loading } = useSelector((state: Store) => state?.postsReducer);
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const wrapperRef = useRef(null) as any
    const { authData } = useSelector((state: any) => state?.authReducer);
    const dispatch = useDispatch();
    const googleId = useMemo(() => (JSON.parse(Storage.getItem("profile") || 'null')?.result?.googleId), []);
    const [tabIndex, setTabIndex] = useState(googleId ? 1 : 0);

    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        setTabIndex(value);
    };

    const uploadImage = async (event: any) => {
        if (event.target.files) {
            const file = event?.target?.files[0]
            const base64 = await convertBase64(file)
            dispatch(uploadUserPhoto(authData?._id, { ...authData, imageUrl: base64 as string }))
        }
    }

    return (
        <>
            <Paper className={classes.container}>
                <Spacer height={40} />
                <Box className={classes.uploadImageContainer}>
                    {!googleId &&
                        <span onClick={() => { wrapperRef.current && wrapperRef.current.click() }} className={classes.hover}>
                            <Box className={classes.hoverItem}>
                                <CreateIcon fontSize="large" />
                                <Typography>Change profile picture</Typography>
                            </Box>
                        </span>}
                    <img className={classes.avatar} alt="avatar" src={authData?.imageUrl || defaultAvatar} />
                    {!googleId
                        && <Box className={classes.inputContainer}>
                            <input
                                accept="image/*"
                                className={classes.inputFile}
                                id="upload-profile"
                                type="file"
                                ref={wrapperRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => uploadImage(e)}
                            />
                            <Box className={classes.iconContainer}>
                                <PhotoCameraIcon fontSize="large" />
                            </Box>
                        </Box>
                    }
                </Box>
                <Spacer height={20} />
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5">{authData?.name || authData?.result?.name}</Typography>
                </Box>
                <Box className={classes.tabs}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {!googleId ? <Tab icon={<PersonPinIcon />} label="About" /> : <Tab style={{ display: "none" }} />}
                        <Tab icon={<PhotoLibraryOutlinedIcon />} label="Your Posts" />
                        <Tab icon={<PhotoSizeSelectActualOutlinedIcon />} label="Photos" />
                    </Tabs>
                </Box>
            </Paper>
            <Spacer height={20} />
            {
                tabIndex === 0 ?
                    <DetailsForm />
                    : null
            }
            {
                tabIndex === 1 ?
                    <Box display="flex" justifyContent="center">
                        {loading ? <Spinner /> :
                            <>
                                <Box>
                                    <PostsList posts={userPosts} setCurrentId={setCurrentId} />
                                </Box>
                                <Box marginTop="16px">
                                    <Form setCurrentId={setCurrentId} currentId={currentId} />
                                </Box>
                            </>
                        }
                    </Box>
                    : null
            }
            {
                tabIndex === 2 ?
                    <ImagesList posts={userPosts} />
                    : null
            }
        </>
    )
}

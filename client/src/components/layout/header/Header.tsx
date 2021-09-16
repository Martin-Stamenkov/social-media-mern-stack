import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, createStyles, makeStyles, Theme, Avatar, Chip } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Storage } from 'storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'auth';
import { clearUserPosts } from 'post';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);


export function Header() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(Storage.getItem("profile") || "null"));
    const dispatch = useDispatch();
    const location = useLocation();
    const { authData } = useSelector((state: any) => state?.authReducer);


    useEffect(() => {
        setUser(JSON.parse(Storage.getItem("profile") || "null"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const handleLoginClick = () => {
        if (user) {
            dispatch(clearUserPosts())
            dispatch(logout())
        }
        history.replace("/auth")
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography style={{ cursor: "pointer" }} onClick={() => history.push("/")} variant="h6" className={classes.title}>
                        Memories
                    </Typography>
                    {user ? <Chip onClick={() => history.push(`/profile/${authData?._id}`)} color="primary" label={`${user?.result?.name}`} avatar={<Avatar src={authData?.imageUrl} />} /> : null}

                    <Button onClick={handleLoginClick} color="inherit">
                        <Typography>{user ? "Logout" : "Login"}</Typography></Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

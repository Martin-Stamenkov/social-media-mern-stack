import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, createStyles, makeStyles, Theme, Avatar, Chip } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Storage } from 'storage';
import { useDispatch } from 'react-redux';
import { logout } from 'auth';

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
    const [user, setUser] = useState(JSON.parse((Storage.getItem("profile") || "null")));
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {

        setUser(JSON.parse((Storage.getItem("profile") || "null")))
    }, [location])

    const handleLoginClick = () => {
        if (user) {
            dispatch(logout())
        }
        history.push("/auth")
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{ cursor: "pointer" }} onClick={() => history.push("/")} variant="h6" className={classes.title}>
                        Memories
                    </Typography>
                    {user ? <Chip onClick={() => history.push("/profile")} color="primary" label={`${user?.result.name}`} avatar={<Avatar src={user?.result.imageUrl} />} /> : null}

                    <Button onClick={handleLoginClick} color="inherit">
                        <Typography>{user ? "Logout" : "Login"}</Typography></Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

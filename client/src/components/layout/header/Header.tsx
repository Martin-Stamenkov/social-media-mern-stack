import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, createStyles, makeStyles, Theme, Avatar, Chip, alpha, Box } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Storage } from 'storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'auth';
import { clearUserPosts } from 'post';
import { SearchInput } from '../../search-input';
import { getListOfUserByName } from 'user/api';
import { IUser } from 'user';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        titleContainer: {
            flexGrow: 1,
            display: "flex",
            alignItems: "center"
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
    const [searchedUsers, setSearchedUsers] = useState<IUser[]>([])


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

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { data } = await getListOfUserByName(e.target.value)
        await setSearchedUsers(data)        
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box className={classes.titleContainer}>
                    <Typography style={{ cursor: "pointer" }} onClick={() => history.push("/")} variant="h6" >
                        Memories
                    </Typography>
                    <Box marginLeft="26px">
                        <SearchInput onChange={handleInputChange} data={searchedUsers} />
                    </Box>
                </Box>
                {user ? <Chip onClick={() => history.push(`/profile`)} color="primary" label={`${user?.result?.name}`} avatar={<Avatar src={authData?.imageUrl} />} /> : null}

                <Button onClick={handleLoginClick} color="inherit">
                    <Typography>{user ? "Logout" : "Login"}</Typography></Button>
            </Toolbar>
        </AppBar>
    )
}

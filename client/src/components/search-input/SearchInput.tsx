import React, { ChangeEventHandler, FormEventHandler, ReactNode, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, Theme, createStyles, alpha, Box, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { IUser } from 'user';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            position: "relative",
            display: "flex",
            minWidth: 100,
            "& input": {
                border: "none",
                height: 30,
                width: "100%",
                padding: "2px 36px 2px 36px",
                outline: 0,
                color: theme.palette.common.white,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                "&::placeholder": {
                    color: theme.palette.common.white,
                }
            }
        },
        searchIcon: {
            position: "absolute",
            top: 5,
            left: 8,
            width: 20,
            marginRight: 14
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            marginRight: 10
        }
    }),
);

interface ISearchInput {
    onChange?: FormEventHandler<HTMLDivElement> | undefined;
    data: IUser[];
}

export function SearchInput({ onChange, data }: ISearchInput) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Autocomplete
            freeSolo
            id="auto-complete"
            disableClearable
            options={data as IUser[]}
            getOptionLabel={((option) => option.name || "")} 
            renderOption={(option) => (
                
                <Box onClick={() => history.push(`./user/${option._id}`)} display="flex">
                    {console.log(option._id)}
                    <Avatar src={option.imageUrl} className={classes.avatar} />
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <div onChange={onChange} className={classes.wrapper} ref={params.InputProps.ref}>
                    <SearchIcon className={classes.searchIcon} />
                    <input placeholder="Search" type="text" {...params.inputProps} />
                </div>
            )}
        />
    );
}

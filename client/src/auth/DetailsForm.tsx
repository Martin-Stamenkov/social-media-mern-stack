import React, { useState } from 'react'
import { Box, Button, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { Spacer, Spinner } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from 'moment';
import { updateUser } from './actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
            width: "40%"
        },
        container: {
            display: "flex",
            flexDirection: "column",
            padding: "10px 14px 10px 14px",
        },
        captionLoginText: {
            cursor: "pointer",
            marginLeft: 3,
            textTransform: "capitalize"
        },
        spinner: {
            marginRight: 12
        },
        joinInfo: {
            marginLeft: 4,

        }
    }),
);

export function DetailsForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, authData } = useSelector((state: any) => state.authReducer)
    const [formData, setFormData] = useState(authData && {
        hometown: authData.hometown,
        city: authData.city,
        education: authData.education,
        occupation: authData.occupation,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(authData._id ? authData._id : authData?.googleId, formData))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        !authData && !formData ? <Spinner /> :
            <Box display="flex" justifyContent="center">
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="on">
                    <Paper className={classes.container}>
                        <Box display="flex" flexDirection="column">
                            <TextField onChange={handleChange} value={formData?.hometown} id="hometown" name="hometown" label="Hometown" />
                            <TextField onChange={handleChange} value={formData?.city} id="city" name="city" label="Current City" />
                            <TextField onChange={handleChange} value={formData?.education} id="education" name="education" label="Education" />
                            <TextField onChange={handleChange} value={formData?.occupation} id="occupation" name="occupation" label="Occupation" />
                            <Box display="flex" alignItems="center"  >
                                <AccountCircleIcon color="disabled" />
                                <Typography className={classes.joinInfo} gutterBottom variant="body2">{`joined: ${moment(authData.createdAt).format('ll')}`}</Typography>
                            </Box>
                        </Box>
                        <Spacer height={8} />
                        <Button disabled={loading} variant="contained" type="submit" color="primary">
                            {loading ? <Spinner className={classes.spinner} size={12} /> : null}
                            <Typography>
                                Submit
                            </Typography>
                        </Button>

                    </Paper>
                </form >
            </Box>
    )
}

import React, { useState } from 'react'
import { Box, Button, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import { Spacer, Spinner } from 'components';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { red } from '@material-ui/core/colors';
import { googleAuthLogin, register, login } from 'auth';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
            marginTop: 50,
            width: "30%"
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
        errors: {
            margin: "0px 0px 6px 8px",
            color: red[500]
        }
    }),
);

export function AuthForm() {
    const classes = useStyles();
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageUrl: ""
    });
    const { loading } = useSelector((state: any) => state.authReducer)

    const responseGoogleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ("profileObj" in res && "tokenId" in res) {
            const result = (res?.profileObj)
            const token = res?.tokenId;

            dispatch(googleAuthLogin({ token, result }))
            history.push("/")
        }
    }

    const responseGoogleFailure = (error: string) => {
        console.log(error)
    }

    const switchMode = () => {
        setIsRegister(prev => !prev)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isRegister) {
            dispatch(register(formData, history))
        } else {
            dispatch(login(formData, history))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Box display="flex" justifyContent="center">
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="on">
                <Paper className={classes.container}>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <LockIcon color="secondary" />
                        <Typography gutterBottom variant="h6">{!isRegister ? "Login" : "Register"}</Typography>
                    </Box>
                    {isRegister ?
                        <Box display="flex">
                            <TextField onChange={handleChange} id="first-name" name="firstName" variant="outlined" label="First Name" required />
                            <TextField onChange={handleChange} id="last-name" name="lastName" variant="outlined" label="Last Name" required />
                        </Box>
                        : null
                    }
                    <TextField onChange={handleChange} id="email" name="email" variant="outlined" label="Email Address" required />
                    <TextField onChange={handleChange} id="password" name="password" variant="outlined" label="Password" type="password" required />
                    {isRegister ?
                        <TextField onChange={handleChange} id="confirm-password" name="confirmPassword" variant="outlined" label="Confirm Password" type="password" required />
                        : null
                    }
                    <Spacer height={8} />
                    <Button disabled={loading} variant="contained" type="submit" color="primary">
                        {loading ? <Spinner className={classes.spinner} size={12} /> : null}
                        <Typography>
                            {!isRegister ? "Login" : "Register"}
                        </Typography>
                    </Button>
                    <Spacer height={8} />
                    <GoogleLogin
                        clientId="762722917664-udo1c1ne62migcjkr3ghn62u01ps2u7o.apps.googleusercontent.com"
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Typography variant="caption" gutterBottom>{!isRegister ? "Don`t you have an account?" : "Already have an account"}
                        <Typography
                            onClick={switchMode}
                            className={classes.captionLoginText}
                            color="primary" variant="overline">
                            {isRegister ? "Login" : "Register"}
                        </Typography>
                    </Typography>
                </Paper>
            </form >
        </Box>
    )
}

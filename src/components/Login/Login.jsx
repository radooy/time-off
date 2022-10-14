import React, { useState } from 'react';

import { Button, Card, CardActions, CardContent, TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { errors as errorMessages } from '../../utils/messages/errors';

function Login() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const onChangeHandler = (e) => {
        setErrors((prevState) => ({
            ...prevState,
            [e.target.name]: false
        }));

        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const submitData = () => {
        setErrors({
            email: false,
            password: false
        });

        let hasError = checkData();
        if (hasError) return;
    };

    const checkData = () => {
        let hasError = false;

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email))) {
            setErrors(prev => ({
                ...prev,
                email: true
            }));
            hasError = true;
        };

        if (loginData.password.length < 8) {
            setErrors(prev => ({
                ...prev,
                password: true
            }));
            hasError = true;
        };

        return hasError;
    };


    return (
        <>
            <Card sx={{
                margin: "150px auto",
                maxWidth: "400px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px"
            }}
            >
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
                >
                    <TextField
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={onChangeHandler}
                        error={errors.email}
                        helperText={errors.email && errorMessages.email}
                    />

                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={onChangeHandler}
                        error={errors.password}
                        helperText={errors.password && errorMessages.password}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        sx={{ margin: "0 auto" }}
                        onClick={submitData}
                    >
                        Log in
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Login;
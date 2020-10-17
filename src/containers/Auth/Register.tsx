import React, { useState, useEffect } from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

const Register = (props:any) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="UserName"
                    defaultValue="UserName"
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
            </div>
            <Button variant="contained" color="primary">Sign Up</Button>
            <Button variant="contained" color="secondary">Sign In</Button>
        </form>
    );
}

export default Register;

import React, { useState, useEffect } from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

import * as actions from '../../store/actions/auth';
import {connect} from "react-redux";

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

const Auth = (props:any) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.onAuth(userName, password);
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="UserName"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => {setUserName(event.target.value);}}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}>
                Sign in</Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={(event) => submitHandler(event)}>
                Sign Up</Button>
        </form>
    );
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (userName: string, password: string) => dispatch(actions.auth(userName, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

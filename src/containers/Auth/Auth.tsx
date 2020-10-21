import React, { useState, useEffect, Fragment } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";

import * as actions from '../../store/actions/auth';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
import { Severity } from '../../shared/type';
import { Redirect, useHistory } from 'react-router-dom';


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

const Auth = (props: any) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("")
    const history = useHistory();

    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setOpen(false);
    };

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.onAuth(userName, password);
        if(props.error){
            setSeverity("error");
            setText("Sign In error");
        }else{
            setSeverity("success");
            setText("Sign In success");
        }
        setOpen(true);
        
    }

    let form = (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="UserName"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => { setUserName(event.target.value); }}
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
                Sign In
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/register")}>
                Sign Up
            </Button>
        </form>
    );

    if (props.loading) {
        form = <CircularProgress />
    }

    return (
        <Fragment>
            {form}
            <CustomizedSnackbars 
                open = {open}
                severity = {severity}
                text = {text}
                onClose={handleClose}
            />
        </Fragment>
    );
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (userName: string, password: string) => dispatch(actions.auth(userName, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

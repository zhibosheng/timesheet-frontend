import React, { useState, useEffect, Fragment } from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Button, CircularProgress} from "@material-ui/core";
import { connect } from "react-redux";
import * as registerActions from '../../store/actions/register';
import { register } from '../../serviceWorker';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';
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

const Register = (props:any) => {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
        props.onRegister(userName, firstName, lastName, password, email, phone)
        if(props.error){
            setSeverity("error");
            setText("Register error");
        }else{
            setSeverity("success");
            setText("Register success");
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
                    required
                    id="outlined-required"
                    label="FirstName"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => { setFirstName(event.target.value); }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="LastName"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => { setLastName(event.target.value); }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => { setEmail(event.target.value); }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    defaultValue=""
                    variant="outlined"
                    onChange={(event) => { setPhone(event.target.value); }}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}>
                Sign Up
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/auth")}>
                Sign In
            </Button>
        </form>
    );

    if (props.loading){
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
        loading: state.register.loading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRegister: (userName: string, firstName:string, lastName:string, password:string, email:string, phone:string) => dispatch(registerActions.register(userName, firstName, lastName, password, email, phone))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

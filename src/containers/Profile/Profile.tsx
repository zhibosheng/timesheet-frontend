import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Avatar, TextField, Button } from '@material-ui/core';
import * as actions from '../../store/actions/user';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';

const Profile = (props:any) => {
    const [userName, setUserName] = useState(props.userName);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("")

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setOpen(false);
    };

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        props.updateUserInformation(props.userId,userName, firstName, lastName, props.password, email, phone,props.avatarUrl)
        if(props.error){
            setSeverity("error");
            setText("Sign In error");
        }else{
            setSeverity("success");
            setText("Sign In success");
        }
        setOpen(true);
        
    }

    return (
        <Fragment>
            <p><Avatar alt="User Avatar" src={props.avatar} /></p>
            <p><TextField
                    required
                    id="outlined-required"
                    label="UserName"
                    defaultValue={userName}
                    variant="outlined"
                    onChange={(event) => setUserName(event.target.value)}
                /></p>
            <p><TextField
                    required
                    id="outlined-required"
                    label="FirstName"
                    defaultValue={firstName}
                    variant="outlined"
                    onChange={(event) => setFirstName(event.target.value)}
                /></p>
            <p><TextField
                    required
                    id="outlined-required"
                    label="LastName"
                    defaultValue={lastName}
                    variant="outlined"
                    onChange={(event) => setLastName(event.target.value)}
                /></p>
            <p><TextField
                    required
                    id="outlined-required"
                    label="email"
                    defaultValue={email}
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                /></p>
            <p><TextField
                    required
                    id="outlined-required"
                    label="phone"
                    defaultValue={phone}
                    variant="outlined"
                    onChange={(event) => setPhone(event.target.value)}
                /></p>
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}>
                Update
            </Button>
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
        userId: state.user.userId,
        userName: state.user.userName,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        password: state.user.password,
        email: state.user.email,
        phone: state.user.phone,
        avatarUrl: state.user.avatarUrl,
        avatar: state.user.avatar,
        createTime: state.user.createTime,
        updateTime: state.user.updateTime,
        loading: state.user.loading,
        error: state.user.error,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateUserInformation: (userId:number,userName: string, firstName: string, lastName: string, password:string, email: string, phone: string,avatarUrl:string) => dispatch(actions.updateUserInformation(userId,userName, firstName, lastName, password, email, phone, avatarUrl))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
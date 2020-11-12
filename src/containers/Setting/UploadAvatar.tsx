import React, { useState, Fragment } from 'react';

import * as userActions from '../../store/actions/user';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Severity } from '../../shared/type';
import CustomizedSnackbars from '../../components/Snackbars/CustomizedSnackbar';

const UploadAvatar = (props: any) => {
    const [selectedFile,setSelectedFile] = useState("")
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<Severity>(undefined);
    const [text, setText] = useState("");

    const onChangeHandler = (event:any) =>{
        event.preventDefault();
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }  
        setOpen(false);
    };

    const onClickHandler = (event:any) =>{
        event.preventDefault();
        props.updateUserAvatar(props.userId, selectedFile);
        if(props.error){
            setSeverity("error");
            setText("Update Avatar error");
        }else{
            setSeverity("success");
            setText("Update Avatar success");
        }
        setOpen(true);
    }
    
    return (
        <Fragment>
            <input type="file" name="file" onChange={onChangeHandler}/>
            <Button variant="contained" color="primary" onClick={onClickHandler}>
                Upload
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
        updateUserAvatar: (userId: number, selectedFile:string) => dispatch(userActions.updateUserAvatar(userId, selectedFile))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
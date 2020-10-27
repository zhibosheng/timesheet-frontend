import React, { useState, Fragment } from 'react';

import * as actions from '../../store/actions/user';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const UploadAvatar = (props: any) => {
    const [selectedFile,setSelectedFile] = useState("")
    const onChangeHandler = (event:any) =>{
        event.preventDefault();
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
    }

    const onClickHandler = (event:any) =>{
        event.preventDefault();
        props.updateUserAvatar(props.userId, selectedFile);
    }
    return (
    <Fragment>
        <input type="file" name="file" onChange={onChangeHandler}/>
        <Button variant="contained" color="primary" onClick={onClickHandler}>
            Upload
        </Button>
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
        updateUserAvatar: (userId: number, selectedFile:string) => dispatch(actions.updateUserAvatar(userId, selectedFile))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
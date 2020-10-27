import React, { useState, useEffect, Fragment } from 'react';
import * as actions from '../../store/actions/user';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import UploadAvatar from './UploadAvatar';

const Setting = (props:any) => {
    return (
        <Fragment>
            <ChangePassword />
            <UploadAvatar />
        </Fragment>
    );
}
const mapStateToProps = (state: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
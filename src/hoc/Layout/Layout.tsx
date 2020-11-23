import React from 'react';
import { Fragment } from "react";
import PersistentDrawerLeft from "../../components/Drawers/PersistentDrawerLeft";
import { connect } from 'react-redux';


const Layout = (props:any) => {

    return (
        <Fragment>
            <PersistentDrawerLeft 
                isAuth={props.isAuthenticated}
                avatar={props.avatar}
                roles={props.roles}
            />
            {props.children}
        </Fragment>
    );
};
const mapStateToProps = (state:any) => {
    return {
      isAuthenticated: state.auth.Authorization !== null,
      avatar: state.user.avatar,
      roles: state.user.roles,
    };
};
export default connect(mapStateToProps)(Layout);
import React from 'react';
import { Fragment } from "react";
import PersistentDrawerLeft from "../../components/Drawers/PersistentDrawerLeft";


const Layout = (props:any) => {

    return (
        <Fragment>
            <PersistentDrawerLeft />

            {props.children}
        </Fragment>
    );
};

export default Layout;
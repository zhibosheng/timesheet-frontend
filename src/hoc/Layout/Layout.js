import React from 'react';
import { Fragment } from "react";
import PersistentDrawerLeft from "../../components/Drawers/PersistentDrawerLeft";


const layout = props => {

    return (
        <Fragment>
            <PersistentDrawerLeft/>
            {props.children}
        </Fragment>
    );
};

export default layout;
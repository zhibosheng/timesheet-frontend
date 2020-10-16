import React from 'react';
import { Fragment } from "react";
import PersistentDrawerLeft from "../../components/Drawers/PersistentDrawerLeft";


const layout = props => {

    return (
        <Fragment>
            <PersistentDrawerLeft name={props.name}/>
            {props.name}
            {props.children}
        </Fragment>
    );
};

export default layout;
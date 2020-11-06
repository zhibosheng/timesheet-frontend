import React, { useState, useEffect, Fragment } from 'react';
import AllUsersTable from '../../components/Table/AllUsersTable';
import * as userActions from '../../store/actions/user';
import { connect } from 'react-redux';
import SimpleTabs from '../../components/Navigation/SimpleTabs';
const HR = (props:any) => {
    return (
    <Fragment>
        <SimpleTabs/>
    </Fragment>
    );
}

export default HR;
import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Register from './containers/Auth/Register';
import Home from './containers/Home/Home';
import Contract from './containers/Contract/Contract';
import Timesheet from './containers/Timesheet/Timesheet';
import HR from './containers/HR/HR';
import Profile from './containers/Profile/Profile';
import Setting from './containers/Setting/Setting';
import Group from './containers/Group/Group';
import { connect } from 'react-redux';
const App = (props:any) => {

  let routes = (
    <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Register} />
        <Redirect to="/auth" />
    </Switch>
  );
  
  if(props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/contract" render={props => <Contract  {...props} />} />
        <Route path="/timesheet" render={props => <Timesheet   {...props} />} />
        <Route path="/group" render={props => <Group  {...props} />} />
        <Route path="/HR" render={props => <HR  {...props} />} />
        <Route path="/profile" render={props => <Profile  {...props} />} />
        <Route path="/setting" render={props => <Setting  {...props} />} />
        <Route path="/home" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}
const mapStateToProps = (state:any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default withRouter(connect(mapStateToProps)(App));

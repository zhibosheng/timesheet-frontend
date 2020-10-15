import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Register from './containers/Auth/Register';

const App = props => {

  let routes = (
    <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/register" exact component={Register} />
        <Redirect to="/auth" />
    </Switch>
  );
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

export default withRouter(App);

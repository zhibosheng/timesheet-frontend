import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';

const App = props => {

  let routes = (
    <Switch>
        <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Layout></Layout>
    </div>
  );
}

export default App;

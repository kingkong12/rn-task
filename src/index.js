import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import Users from './Users/Users';
import Details from './Details/Details';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route  exact path='/'  component={Users}/>
        <Route  path='/details/:id'  component={Details}/>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



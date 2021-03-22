import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import Achievements from './pages/Achievements';
import Statistics from './pages/Statistics';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/achievements">
        <Achievements />
      </Route>
      <Route path="/statistics">
        <Statistics />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Page from './js/components/Page';
import Home from './js/components/Homepage';
import Static from './js/components/StaticHomepage';

import style from './main.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Home} />
      <Route path="static" component={Static}/>
    </Route>
  </Router>
), document.getElementById('root'));

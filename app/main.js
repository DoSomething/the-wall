import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Page from './js/components/Page';
import Home from './js/components/Homepage';

import style from './main.scss';

import 'whatwg-fetch';

fetch('https://www.dosomething.org/api/v1/reportbacks').then(res => res.json()).then(res => console.log(res))

render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('root'));

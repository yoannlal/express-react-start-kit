

import React from 'react';
import { render } from 'react-dom';
import history from './scripts/history';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

//===================MAIN DIV===================

const App = React.createClass({

  render() {

    return (
        <div id='container'>
          <Nav />
          {React.cloneElement(this.props.children)}
        </div>
    );
  }
});

//===================IMPORT ROUTES===================

import About from './components/Home';
import About from './components/About';

//=================REACT ROUTER ROUTES================

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/About" component={About} />
    </Route>
  </Router>
), document.getElementById('app'));

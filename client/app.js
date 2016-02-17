

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

//===================MAIN DIV===================

const App = React.createClass({

  render() {

    return (
        <div id='container'>
          <ul role="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          {React.cloneElement(this.props.children)}
        </div>
    );
  }
});

//===================IMPORT ROUTES===================

import Home from './components/Home';
import About from './components/About';

//=================REACT ROUTER ROUTES================

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/About" component={About} />
    </Route>
  </Router>
), document.getElementById('app'));

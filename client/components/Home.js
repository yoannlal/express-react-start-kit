import React from 'react';

const Home = React.createClass({

  render() {
    return (
        <div>
          <ul role="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
    );
  }
});

module.exports = Home;

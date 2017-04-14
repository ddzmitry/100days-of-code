import React, { Component } from 'react';

class BootstrapExample extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="jumbotron">
          <h1>Hello, world!</h1>
          <p>I'm a jumbotron!</p>
          <p>
            <a className="btn btn-primary btn-lg">Learn more</a>
          </p>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Panel title</h3>
          </div>
          <div className="panel-body">
            Panel content
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Panel title</h3>
          </div>
          <div className="panel-body">
            Panel content
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapExample;

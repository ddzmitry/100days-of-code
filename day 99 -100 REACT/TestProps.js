import React, { Component } from 'react';

class TestProps extends Component {
  render() {
    return (
      <div className="container">
        {this.props.name} reversed is {this.props.name.split("").reverse().join("")}
      </div>
    );
  }
}

TestProps.propTypes = {
  name: React.PropTypes.string.isRequired,
}

export default TestProps;

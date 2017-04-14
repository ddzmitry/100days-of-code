import React, { Component } from 'react';

class HelloWorld extends Component {
    render() {
        return (
            <div className="container">
               HellO!  {this.props.value}
            </div>
        );
    }
}


export default HelloWorld;

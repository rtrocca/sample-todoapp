import {Component} from 'react';
import {react2angular} from 'react2angular';

class HelloReact extends Component {
    state = {
        data: ''
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    
    render() {
        return (
            <div>
                HELLO
            </div>
        );
    }
}

angular.module('todoApp').component('helloReact', react2angular(HelloReact, [], []));
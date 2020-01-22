import React from 'react';
import * as angular from 'angular';
import { react2angular } from 'react2angular';


const Title = () => {
    return <h1 className="display-4">To Do</h1>;
}

angular.module('todoApp').component('appTitle', react2angular(Title, [], []));
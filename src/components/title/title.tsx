import React, { FunctionComponent } from 'react';
import * as angular from 'angular';
import { react2angular } from 'react2angular';

const Title: FunctionComponent<{appTitle: number}> = (props) => {
    return (
        <h1 className="display-4">
            {props.appTitle}
        </h1>
    );
};

angular.module('todoApp').component('appTitle', react2angular(Title, ['appTitle'], []));
import React, { FunctionComponent } from 'react';
import * as angular from 'angular';
import { react2angular } from 'react2angular';

const Title: FunctionComponent<{appTitle: number}> = (props) => (
  <>
    <h1 className="display-4">
      {props.appTitle}
    </h1>
    <a>ciao</a>
    <img src="https://somewere.com/p.jpg" />
  </>
);

angular.module('todoApp').component('appTitle', react2angular(Title, ['appTitle'], []));

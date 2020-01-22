import * as angular from 'angular';
import template from './root.ng.html';
const componentName = 'root';

angular.module('todoApp').component(
    componentName, {
        template,
        bindings: {},
        controller: [
            function() {
                let $ctrl = this;
            }
        ]
    }
);
window.jQuery = window.$ = require('jQuery');
window._ = require('lodash');
require('angular');
require('angular-ui-bootstrap');
require('bootstrap');
require('@uirouter/core');
require('@uirouter/angularjs');

import uiRouter from '@uirouter/angularjs';

export const app = angular.module('todoApp',[
    uiRouter
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    ( 
        $stateProvider,
        $urlRouterProvider
    ) => {
        $stateProvider.state({
            name: 'list',
            url: '/list',
            template: '<todo-list></todo-list>'
        }).state({
            name: 'edit',
            url: '/edit/:todoId?',
            component: 'todoEdit',
            resolve: {
                
                todo: [
                    'storage',
                    '$transition$',
                    (
                        storage,
                        $transition$
                    ) => {
                        let id = $transition$.params().todoId;
                        if (!id) {
                            return storage.createNew();
                        } else {
                            return storage.get(id);
                        }
                    }
                ]
            }
        });

        $urlRouterProvider.otherwise('/list');
    }
]);
require('./services/services' );
require('./components/components');







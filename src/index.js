window.jQuery = window.$ = require('jquery');
import 'popper.js'
import 'bootstrap'

window._ = require('lodash');

require('angular');

require('@uirouter/core');
require('@uirouter/angularjs');

import uiRouter from '@uirouter/angularjs';

/*import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
*/
//import '@fortawesome/fontawesome-free/css/all.css';
import './css/app.scss';

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







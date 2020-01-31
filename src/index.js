import 'react-app-polyfill/stable';
import 'popper.js';
import 'bootstrap';

import uiRouter from '@uirouter/angularjs';

/* import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
*/
// import '@fortawesome/fontawesome-free/css/all.css';
import './css/app.scss';
// use shimming
// https://gregbabiars.com/migrating-gulp-to-webpack/
window.jQuery = window.$ = require('jquery');

window._ = require('lodash');

require('angular');

require('@uirouter/core');
require('@uirouter/angularjs');

export const app = angular.module('todoApp', [
    uiRouter,
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    (
        $stateProvider,
        $urlRouterProvider,
    ) => {
        $stateProvider.state({
            name: 'list',
            url: '/list',
            template: '<todo-list></todo-list>',
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
                        $transition$,
                    ) => {
                        const id = $transition$.params().todoId;
                        if (!id) {
                            return storage.createNew();
                        }
                            return storage.get(id);
                    },
                ],
            },
        });

        $urlRouterProvider.otherwise('/list');
    },
]);

// Load files containing AngularJS templates, compile them and
// add them to the cache. This is needed if the file itself is not
// loaded as component's template.
app.run([
    '$compile',
    '$templateCache',
    function ($compile, $templateCache) {
        function requireAll(requireContext) {
            return requireContext.keys().map((val) => ({
                    // tpl will hold the value of your html string because thanks to wepbpack "raw-loader" **important**
                    tpl: requireContext(val),

                    // name is just the filename
                    name: val.split('/').pop(),
                }));
        }

        const modules = requireAll(require.context('./templates/', true, /\.ng\.html$/));

        modules.forEach((val) => {
            $compile(val.tpl);
            $templateCache.put(val.name, val.tpl);
        });
    },
]);

require('./services/services');
require('./components/components');

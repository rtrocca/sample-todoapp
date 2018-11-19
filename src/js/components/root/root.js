const componentName = 'root';

angular.module('todoApp').component(
    componentName, {
        template: require('./root.ng.html'),
        bindings: {},
        controller: [
            function() {
                let $ctrl = this;
            }
        ]
    }
);
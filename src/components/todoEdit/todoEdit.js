angular.module('todoApp').component(
    'todoEdit', {
        template: require('./todoEdit.ng.html'),
        bindings: {
            todo: '<'
        },
        controller: [ 
            '$state',
            'storage',
            
            function(
                $state,
                storage
            ){
            let $ctrl = this;

            $ctrl.$onInit = () => {
            };

            $ctrl.$onChanges = (changes) => {
            }

            $ctrl.onKeyDown = ($event) => {
                if (event.keyCode === 13) {
                    $ctrl.onSave();
                }
            }
            $ctrl.onSave = () => {
                let promise;
                if (!$ctrl.todo.id) {
                    promise = storage.save($ctrl.todo);
                } else {
                    promise = storage.update($ctrl.todo);
                }
                promise.then( () => {
                    $state.go('list');
                });
            };

            $ctrl.onCancel = () => {
                $state.go('list');
            };

            $ctrl.onDelete = () => {
                storage.remove($ctrl.todo.id).then(()=> {$state.go('list');});
            }

            $ctrl.isNew = () => $ctrl.todo && !$ctrl.todo.id;
        }]
    }
);
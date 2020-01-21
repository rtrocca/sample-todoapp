angular.module('todoApp').component( 'todoList',{
    template: require('./todoList.ng.html'),
    bindings: {},
    controller: [
        '$state',
        'storage',
        function(
            $state,
            storage
        ) {
            let $ctrl = this;

            $ctrl.$onInit = () => {
                storage.get().then(
                    (myData) => {
                        $ctrl.todos = myData;
                    }
                );
            };

            $ctrl.onCreateClick= () => {
                console.log('onCreateClick');
                $state.go('edit', {todoId: null});
            };

            $ctrl.toggleDone = (todo) => {
                todo.done = !todo.done;
                storage.update(todo).then(
                    (todos) => {
                        $ctrl.todos = todos;
                    }
                );
            };

            $ctrl.onModalCancel = () => {
                $('#confirmDialog').modal('hide');
                $ctrl.currentTask = null;
            };

            $ctrl.onConfirmDelete = (task) => {
                $ctrl.currentTask = task;
                $('#confirmDialog').modal('show');
            };

            $ctrl.onDelete = (todo) => {
                $ctrl.onModalCancel();
                storage.remove(todo.id).then(
                    (todos) => $ctrl.todos = todos 
                );
            }
        }
    ]
});
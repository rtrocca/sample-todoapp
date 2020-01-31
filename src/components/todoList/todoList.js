import * as angular from 'angular';
import template from './todoList.ng.html';

angular.module('todoApp').component('todoList', {
    template,
    bindings: {},
    controller: [
        '$state',
        'storage',
        function (
            $state,
            storage,
        ) {
            const $ctrl = this;

            $ctrl.$onInit = () => {
                storage.get().then(
                    (myData) => {
                        $ctrl.todos = myData;
                    },
                );
            };

            $ctrl.onCreateClick = () => {
                $state.go('edit', { todoId: null });
            };

            $ctrl.toggleDone = (todo) => {
                todo.done = !todo.done;
                storage.update(todo).then(
                    (todos) => {
                        $ctrl.todos = todos;
                    },
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
                    (todos) => { $ctrl.todos = todos; },
                );
            };
        },
    ],
});

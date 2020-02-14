import * as angular from 'angular';
import { IController } from 'angular';

import template from './todoEdit.ng.html';

class NavigatingController implements IController {
    static $inject = [
        '$state'
    ];

    constructor(private $state: any) {}

    $onInit() {
        console.log('NavigatingController $onInit');
    }

    protected go(state: string) {
        this.$state.go(state);
    }
}

class ToDoEditController extends NavigatingController {
    static $inject = [ 
        'storage',
        ...NavigatingController.$inject
    ];

    //private $state: any;
    //private storage: any;
    public todo: any;
    constructor(
        private storage: any,
        $state: any
        //...args: typeof NavigatingController.$inject
    ) {
        super($state);
        //this.$state = $state;
        //this.storage = storage;
        //console.log('ToDoEditController ctor', $state, this.$state, storage, this.storage, this.todo);
    }

    $onInit() {
        super.$onInit();
        console.log('ToDoEditController $onInit');
    }

    onKeyDown(event: any) {
        if (event.keyCode === 13) {
            this.onSave();
        }
    }

    onSave() {
        let promise;
        if (!this.todo.id) {
            promise = this.storage.save(this.todo);
        } else {
            promise = this.storage.update(this.todo);
        }
        promise.then(() => {
            this.go('list');
        });
    };

    onCancel() {
        this.go('list');
    };

    onDelete() {
        this.storage.remove(this.todo.id)
            .then(() => { 
                this.go('list'); 
            });
    };

    isNew() {
        return this.todo && !this.todo.id;
    }
}


angular.module('todoApp').component(
    'todoEdit', {
        template,
        bindings: {
            todo: '<',
        },
        controller: ToDoEditController
    });

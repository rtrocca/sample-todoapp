import * as angular from 'angular';
import 'angular-mocks';

import '../src/services/todo';

describe('ToDo service', function() {

    

    // angular.module('todoApp').service('storage'
    let storage;

    // Load addressUtilities
    beforeEach(function () {
        //angular.mock.module('todoApp');

        inject(function (_storage_) {
            storage = _storage_;
        });
    });

    // A simple test to verify the service exists
    it('should exist', function () {
        expect(storage).toBeDefined();
    });

});
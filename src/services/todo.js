import * as uuid4 from 'uuid4';
import * as angular from 'angular';

angular.module('todoApp').service('storage', [
    '$q',
    function ($q) {
        function createNew() {
            const deferred = $q.defer();
            deferred.resolve({ text: 'NEW', done: false });
            return deferred.promise;
        }

        function getData() {
            let myData = window.localStorage.getItem('myData');
            if (myData) {
                try {
                    myData = JSON.parse(myData);
                } catch (e) {
                    myData = [];
                }
            } else {
                myData = [];
            }

            return myData;
        }

        function saveData(data) {
            window.localStorage.setItem('myData', JSON.stringify(data));
        }

        function get(id) {
            const deferred = $q.defer();
            const myData = getData();
            if (id !== undefined) {
                const record = _.find(myData, { id });
                deferred.resolve(record);
            } else {
                deferred.resolve(myData);
            }
            return deferred.promise;
        }

        function save(record) {
            const deferred = $q.defer();
            record.id = uuid4();
            const myData = getData();
            myData.push(record);
            saveData(myData);
            deferred.resolve(myData);
            return deferred.promise;
        }

        function remove(id) {
            const deferred = $q.defer();
            const myData = getData().filter((record) => record.id !== id);
            saveData(myData);
            deferred.resolve(myData);
            return deferred.promise;
        }

        function update(record) {
            const deferred = $q.defer();
            const myData = getData();
            const idx = _.findIndex(myData, { id: record.id });
            if (idx >= 0) {
                myData.splice(idx, 1, record);
                saveData(myData);
                deferred.resolve(myData);
            } else {
                deferred.reject('Not found');
            }
            return deferred.promise;
        }

        return {
            createNew,
            get,
            save,
            update,
            remove,
        };
    },
]);

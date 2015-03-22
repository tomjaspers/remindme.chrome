'use strict';

angular.module('remindme').controller('MainController', ['$scope', 'StorageService', function($scope, StorageService) {
    $scope.items = StorageService.get();

    $scope.removeItem = function(url) {
        StorageService.remove(url);
        $scope.marks = StorageService.get();

        if(!$scope.$$phase) {
            $scope.$apply();
        }

        chrome.extension.sendMessage({
              action : 'remove',
        });
    };

}]);
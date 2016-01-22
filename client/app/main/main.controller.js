'use strict';

angular.module('herokuYoTestApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.progress = [];

    $http.get('/api/progress').success(function(progress) {
      $scope.progress = progress;
    });

    $scope.addProgress = function() {
      if($scope.newProgress === '') {
        return;
      }
      $http.post('/api/progress', { name: $scope.newProgress });
      $scope.newProgress = '';
    };

    $scope.deleteThing = function(progress) {
      $http.delete('/api/progress/' + progress._id);
    };
  });

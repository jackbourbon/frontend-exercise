'use strict'

var grandprixApp = angular.module('grandprixApp', []);

grandprixApp.controller('StandingsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('api/standings.json').success(function(data){
    $scope.drivers = data
  });
}]);

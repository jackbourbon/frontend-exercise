var grandprixApp = angular.module('grandprixApp', ['ngRoute']);

grandprixApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'static/partials/standings.html',
        controller: 'StandingsCtrl'
      }).
      when('/teams/:teamId', {
        templateUrl: 'static/partials/team-detail.html',
        controller: 'TeamDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

grandprixApp.controller('StandingsCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  $interval(function() {
    $http.get('api/standings.json').success(function(data){
      $scope.drivers = data;
    });
  }, 1000);
}]);

grandprixApp.controller('TeamDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  $http.get('api/team/' + $routeParams.teamId + '.json').success(function(data){
    $scope.team = data;
  });

  $http.get('api/standings.json').success(function(data){
    $scope.drivers = data;
  });
}]);

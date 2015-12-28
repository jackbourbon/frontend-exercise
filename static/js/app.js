var grandprixApp = angular.module('grandprixApp', ['ngRoute']);

//Router
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

//Services
angular.module('grandprixApp')
    .service('api', ['$http', function ($http) {
        var urlBase = 'api';

        this.getStandings = function(){
            return $http.get(urlBase + '/standings.json');
        };

        this.getTeamInfo = function(teamId){
            return $http.get(urlBase + '/team/' + teamId + '.json');
        };
}]);

//Controllers
grandprixApp.controller('StandingsCtrl', ['$scope', 'api', '$interval', function($scope, api, $interval){
  $interval(function() {
    api.getStandings().success(function(data){
      $scope.drivers = data;
    });
  }, 1000);
}]);

grandprixApp.controller('TeamDetailCtrl', ['$scope', 'api', '$routeParams', '$filter', function($scope, api, $routeParams, $filter){
  api.getTeamInfo($routeParams.teamId).success(function(data){
    $scope.team = data;
  });

  api.getStandings().success(function(data){
    $scope.drivers = $filter('orderBy')(data, '-points')
  });
}]);

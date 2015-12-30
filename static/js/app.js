var grandprixApp = angular.module('grandprixApp', ['ngRoute']);

grandprixApp.run(['Standings','$interval', function(Standings, $interval) {
  $interval(Standings.getDrivers.bind(Standings), 1000);
}]);

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

//Factories
grandprixApp.factory('Standings', ['api', '$filter', function(api, $filter) {
    var Standings = {
        drivers: []
    };

    Standings.getDrivers = function() {
        var updatedStandings = this;

        api.getStandings().success(function(data){
            updatedStandings.drivers = $filter('orderBy')(data, '-points');
        });
    };

    return Standings;
}]);

grandprixApp.controller('StandingsCtrl', ['$scope', 'Standings', function($scope, Standings){
    $scope.Standings = Standings;
    $scope.teams = {}
}])
.directive('myTeamFinder', ['api', function(api) {
    return {
        template: '<a href="#/teams/{{driver.team}}">{{teams[driver.team]}}</a>',
        link: function(scope){
            api.getTeamInfo(scope.driver.team).success(function(data){
                scope.teams[scope.driver.team] = data.team;
            });
        }
    }
}]);

grandprixApp.controller('TeamDetailCtrl', ['$scope', 'api', '$routeParams', 'Standings', function($scope, api, $routeParams, Standings){
  api.getTeamInfo($routeParams.teamId).success(function(data){
    $scope.team = data;
  });

  $scope.Standings = Standings;
}]);

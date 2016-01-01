var grandprixApp = angular.module('grandprixApp', ['ngRoute']);

//Every second, wherever we are in the app, we get the standings
grandprixApp.run(['Standings','$interval', function(Standings, $interval) {
  $interval(Standings.getDrivers.bind(Standings), 1000);
}]);

// ROUTER
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

// SERVICES
angular.module('grandprixApp')
    .service('api', ['$http', function ($http) {
        var urlBase = 'api';

        // API call to get a promise for standings
        this.getStandings = function(){
            return $http.get(urlBase + '/standings.json');
        };

        // API call to get a promise for a team object
        this.getTeamInfo = function(teamId){
            return $http.get(urlBase + '/team/' + teamId + '.json');
        };
}]);

// FACTORIES
grandprixApp.factory('Standings', ['api', '$filter', function(api, $filter) {
    var Standings = {
        drivers: []
    };

    // Retrieves the drivers from the API and returns them sorted by their number of points
    Standings.getDrivers = function() {
        var updatedStandings = this;

        api.getStandings().success(function(data){
            updatedStandings.drivers = $filter('orderBy')(data, '-points');
        });
    };

    return Standings;
}]);

// CONTROLLERS AND DIRECTIVES
grandprixApp.controller('StandingsCtrl', ['$scope', 'Standings', function($scope, Standings){
    $scope.Standings = Standings;
    $scope.teams = {}
}])
.directive('myTeamFinder', ['api', function(api) {
    return {
        template: '<a href="#/teams/{{driver.team}}">{{teams[driver.team]}}</a>',
        // This directive is used to retrieve and show the name of the driver's team in the standings
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

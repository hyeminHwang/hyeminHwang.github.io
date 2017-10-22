(function () {
  'use strict';

  angular.module('sfmuni.controllers')
    .controller('RouteDataCtrl', function($scope, $http) {
      $http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni').
      success(function(data, status, headers, config) {
        var routeColors = {};
        var routeNames = {};
        data.route.forEach(function(route){
          routeColors[route.tag] = route.color;
          routeNames[route.tag] = route.title;
        });
        $scope.routeColors = routeColors;
        $scope.routeNames = routeNames;
      }).
      error(function(data, status, headers, config) {
        console.error("Unable to retrieve route data list.");
      });

    });
}());

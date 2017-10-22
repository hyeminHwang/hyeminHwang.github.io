(function () {
  'use strict';

  angular.module('sfmuni.controllers')
    .controller('RouteSelectPanelCtrl', function($scope, $http) {
      $http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni').
      success(function(data, status, headers, config) {
        var routeList = [];
        data.route.forEach(function(route){
          routeList.push(route.title);
        });
        $scope.routes = routeList;
      }).
      error(function(data, status, headers, config) {
        console.error("Unable to retrieve route list.");
      });
    $scope.isActive = false;
  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  }
    });
}());

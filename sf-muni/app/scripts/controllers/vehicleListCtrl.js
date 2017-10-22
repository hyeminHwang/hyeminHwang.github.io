(function () {
  'use strict';

  angular.module('sfmuni.controllers')
    .controller('vehicleListCtrl', function($scope, $http, $timeout) {

      $scope.getVehicleLocationList = function() {
        $http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0').
        success(function(data, status, headers, config) {
          $scope.vehicleList = data;
          console.log("Vechicle data retrieved. Next retrieve in 15 seconds.")
        }).
        error(function(data, status, headers, config) {
          console.error("Unable to retrieve vehicle list.");
        });
        $timeout($scope.getVehicleLocationList, 15000);
      }

      $scope.getVehicleLocationList();
    });
}());

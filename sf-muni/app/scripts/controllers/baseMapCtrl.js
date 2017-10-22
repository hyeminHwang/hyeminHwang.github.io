(function () {
  'use strict';

  angular.module('sfmuni.controllers')
    .controller('baseMapCtrl', function($scope, $http) {
      var mapNames = ['streets', 'neighborhoods', 'freeways', 'arteries'];

      mapNames.forEach(function(mapName) {
        $http.get('../app/scripts/data/' + mapName + '.json').
          success(function(data, status, headers, config) {
            $scope.svg
              .append("path")
              .datum(data)
              .attr("class", mapName)
              .style("fill", "none")
              .attr("d", $scope.path);
          }).
          error(function(data, status, headers, config) {
            console.error("Failed to load map: " + mapName);
          });
      })
    });
}());

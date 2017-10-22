(function () {
  'use strict';

  angular.module('sfmuni.directives')
    .directive('baseMap', ['d3', function(d3) {
      return {
        restrict: 'E',
        scope: {},
        controller: 'baseMapCtrl',
        link: function (scope, element, attrs) {
          var width = 900, height = 900;

          scope.svg = d3.select(element[0])
            .append("svg")
            .attr("width", "100%")
            .attr("height", height)
            .call(d3.behavior.zoom().on("zoom", function () {
              scope.svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g");

          scope.projection = d3.geo.mercator()
              .center([-122.433701, 37.767683])
              .scale(300000)
              .translate([width / 2 + 100, height / 2 - 10]);

          scope.path = d3.geo.path()
              .projection(scope.projection);

        }
      };
    }]);
}());

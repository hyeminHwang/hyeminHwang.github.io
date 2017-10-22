(function () {
  'use strict';

  angular.module('sfmuni.directives')
    .directive('vehicles', ['d3', '$timeout', function(d3, $timeout) {
      return {
        restrict: 'E',
        scope: false,
        controller: 'vehicleListCtrl',
        link: function (scope, element, attrs) {
          scope.$watch(function() {
            return scope.$root.routeFilterList;
          },
          function(newList, oldList) {
            console.log(newList);
            scope.svg.selectAll(".vehicleSpot").remove();
            renderVehicles();
          }, true);

          var renderVehicles = function() {
            var transitionDelay = 2000;
            var translation = function(d) {
              return "translate(" + scope.projection([d.lon, d.lat]) + ")" +
                     "rotate(" + d.heading + ")" +
                     "scale(1)";
            };
            var tooltip = d3.select("body")
              .append("div")
              .attr("class", "tip");

            var routeFilterList = scope.$root.routeFilterList;

            scope.drawVehiclePoint = scope.svg.selectAll(".vehicleSpot")
              .data(scope.vehicleList.vehicle, function(d) {
                return d.id;
              });

            scope.drawVehiclePoint.transition().duration(transitionDelay)
              .attr("transform", translation);

            scope.drawVehiclePoint.enter()
              .append("svg:path")
              .filter(function(d) {
                return (!routeFilterList || routeFilterList.length == 0 || routeFilterList.includes(scope.$parent.routeNames[d.routeTag]));
              })
              .attr("class", "vehicleSpot")
              .attr("transform", translation)
              .attr("d", d3.svg.symbol().type("triangle-up"))
              .style("fill", function(d) {
                return scope.$parent.routeColors[d.routeTag];
              })
              .on("mouseover", function(d) {
                  tooltip.html("<strong>Route:</strong><span style='color:black'>" + d.routeTag +
                    "</span><br><span style='color:purple; font-size:12px;'>");
                  tooltip.style("visibility", "visible");
              })
              .on("mousemove", function() {
                  return tooltip.style("top", (d3.event.pageY)+"px").style("left",(d3.event.pageX)+"px");
              })
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
              ;

            scope.drawVehiclePoint.exit().transition().duration(transitionDelay)
            .attr("opacity", 0.0)
            .remove();

            $timeout(renderVehicles, 3000);
          }

          $timeout(renderVehicles, 1500);
        }
      };
    }]);

}());

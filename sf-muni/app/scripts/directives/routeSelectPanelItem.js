(function () {
  'use strict';

  angular.module('sfmuni.directives')
    .directive('routeSelectPanelItem', function() {
      return {
        restrict: 'E',
        scope: false,
        template: '<li class="nav-item" ><a class="nav-link" href="" ng-click="addToFilterList(data)">{{data}}</a></li>',
        replace: true,
        link: function (scope, element, attrs) {
          scope.data = attrs.data;

          scope.addToFilterList = function(tag) {

            var routeFilterList = scope.$root.routeFilterList
            if (!routeFilterList) routeFilterList = [];
            if (routeFilterList.includes(tag))
              routeFilterList.pop(tag);
            else
              routeFilterList.push(tag);
            scope.$root.routeFilterList = routeFilterList

          }
        }
      };
    });
}());

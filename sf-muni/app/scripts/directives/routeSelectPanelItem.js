(function () {
  'use strict';

  angular.module('sfmuni.directives')
    .directive('routeSelectPanelItem', function() {
      return {
        restrict: 'E',
        scope: false,
        template: "<li class='nav-item' id='li-{{data}}' ><a class='nav-link' href='' ng-click='addToFilterList(data)'>{{data}}</a></li>",
        replace: true,
        link: function (scope, element, attrs) {
          scope.data = attrs.data;

          scope.addToFilterList = function(tag) {
            var liStyleElement = document.getElementById('li-' + tag).style;
            if (liStyleElement.backgroundColor == "") liStyleElement.backgroundColor = "#7F7FFF";
            else liStyleElement.backgroundColor = "";

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

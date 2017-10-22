(function () {
  'use strict';

  // create the angular app
  angular.module('sfmuni', [
    'sfmuni.controllers',
    'sfmuni.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('sfmuni.controllers', []);
  angular.module('sfmuni.directives', ['d3']);


}());
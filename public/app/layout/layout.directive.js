(function() {
  'use strict';

  angular.module('movieSearchReduxApp')
    .directive('masterLayout', layoutDirective)

    function layoutDirective() {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: '/app/layout/layout.directive.html',
        controller: layoutController,
        controllerAs: 'vm'
      }
    }

    layoutController.$inject = ['$log']

    function layoutController($log) {
      const vm = this;
    }

}());

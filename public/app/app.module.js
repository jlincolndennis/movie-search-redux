(function() {
  'use strict';

  const dependencies = [
    'ui.router',
    'ngAnimate',
    'movieSearch'
  ]

  angular.module('movieSearchReduxApp', dependencies)

    .config(setupStates)

    function setupStates($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          templateUrl: "/app/layout/landing.html",
          url: '/'
        })
        .state('details', {
          template: "<ms-movie-detail></ms-movie-detail>",
          url: '/:movieId/details'
          // url: '/details'

        })
        .state('results', {
          template: "<ms-search-results></ms-search-results>",
          url: '/results/:searchTerm'
        })
    }

}());

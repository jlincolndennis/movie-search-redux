(function() {
  'use strict';

  angular.module('movieSearch')
    .directive('msSearchResults', searchResultsDirective)

    function searchResultsDirective() {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: '/app/movie-search/search-results.directive.html',
        controller: searchResultsController,
        controllerAs: 'vm'
      }
    }

    searchResultsController.$inject = ['$log', '$stateParams','movieService']

    function searchResultsController($log, $stateParams, movieService) {
      const vm = this;

      movieService.searchMovies($stateParams.searchTerm)
        .then(function(results){
          vm.movies = results;
          vm.searchTerm = $stateParams.searchTerm;
      })

    }


}());

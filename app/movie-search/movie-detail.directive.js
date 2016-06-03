(function() {
  'use strict';

  angular.module('movieSearch')
    .directive('msMovieDetail', movieDetailDirective)

    function movieDetailDirective() {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/movie-search/movie-detail.directive.html',
        controller: movieDetailController,
        controllerAs: 'vm'
      }
    }

    movieDetailController.$inject = ['$stateParams', 'movieService', '$log']

    function movieDetailController($stateParams, movieService, $log) {
      const vm = this;
      console.log('state params', $stateParams.movieId);
      movieService.movieDetails($stateParams.movieId)
        .then(function (movie) {
          vm.movie = movie;
          $log.log('in the movie detail controller', vm.movie);
        })

    }
}());

(function() {
  'use strict';

  angular.module('movieSearch')
    .directive('msSearchBar', searchBarDirective)

    function searchBarDirective() {
      return {
        restrict: 'E',
        scrope: {},
        templateUrl: '/app/movie-search/search-bar.directive.html',
        controller: searchBarController,
        controllerAs: 'vm'
      }
    }

    searchBarController.$inject = ['$log', '$state', 'movieService']

    function searchBarController($log, $state, movieService) {
      const vm = this;
      vm.sendQuery = sendQuery

      function sendQuery() {
        var newQuery = angular.copy(vm.query.title)
        vm.query.title = null
        $state.go('results', {searchTerm: newQuery})

        // movieService.searchMovies(newQuery)
        //   .then(function(res){
        //     $state.go('results', {searchTerm: newQuery})
        //     console.log('then contents', res);
        //     console.log('movieService searchResult',movieService.searchResult);
          // })


      }

    }

}());

(function() {
  'use strict';

  angular.module('movieSearch')
    .factory('movieService', movieFactory);

    movieFactory.$inject = ['$http', '$q', '$log']

    function movieFactory($http, $q, $log) {
      var cachedSearches = {};
      var cachedMovies = {};
      var searchResult = ['poop'];
      var baseUrl = 'http://www.omdbapi.com/?'

      return {
        searchMovies: searchMovies,
        getSearchResults: getSearchResults,
        movieDetails: movieDetails
      }

      function searchMovies(title) {
        searchResult = null;
        var APISearchParam = "s=";
        var url = baseUrl + APISearchParam + title;

        return $q(function (resolve, reject) {
          if (cachedSearches[title]) {
            searchResult = cachedSearches[title]
            resolve(searchResult)
          } else {
            $http.get(url)
              .success(function(res){
                if(res.Response === 'False') {
                  $log.error('No movies Found', res)
                  reject('Error: No Movies Found')
                } else {
                  var results = res.Search;
                  cachedSearches[title] = [];

                  results.forEach(function(item){
                      cachedSearches[title].push({
                      id: item.imdbID,
                      title: item.Title,
                      imageUrl: item.Poster,
                      type: item.Type,
                      year: item.Year
                    })
                  })
              searchResult = cachedSearches[title];
              $log.log('Successful search', searchResult);
              $log.log('cache', cachedSearches);
              $log.log('raw result', res.Search);
              resolve(searchResult)
              }
            })
          }
        })
      }

      function getSearchResults() {
        return searchResult
      }

      function movieDetails(id) {
        var APIMovieParam = "i=";
        var url = baseUrl + APIMovieParam + id;

        return $q(function(resolve, reject){
          if (cachedMovies[id]) {
            resolve(cachedMovies[id])
          } else {
            $http.get(url)
              .success(function (res) {
                if (res.Response === 'False') {
                  reject (res.Error)
                } else {
                  cachedMovies[id] = {
                    title: res.Title,
                    year: res.Year,
                    actors: res.Actors,
                    director: res.Director,
                    genre: res.Genre,
                    plot: res.Plot,
                    imageUrl: res.Poster,
                    rating: res.Rated,

                  };
                  console.log('movie detail', cachedMovies[id]);
                  resolve(cachedMovies[id])
                }

              })
          }
        })


      }

    }
}());

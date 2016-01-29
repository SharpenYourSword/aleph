var aleph = angular.module('aleph', ['ngRoute', 'ngAnimate', 'angular-loading-bar', 'ui.bootstrap',
                                     'debounce', 'infinite-scroll', 'pdf']);

aleph.config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider',
    function($routeProvider, $locationProvider, cfpLoadingBarProvider) {

  cfpLoadingBarProvider.includeSpinner = false;

  $routeProvider.when('/search', {
    templateUrl: 'search.html',
    controller: 'SearchCtrl',
    reloadOnSearch: true,
    loginRequired: false,
    resolve: {
      'data': loadSearch
    }
  });

  $routeProvider.when('/tabular/:document_id/:table_id', {
    templateUrl: 'tabular.html',
    controller: 'TabularCtrl',
    reloadOnSearch: true,
    loginRequired: false,
    resolve: {
      'data': loadTabular,
      'metadata': loadMetadata
    }
  });

  $routeProvider.when('/text/:document_id', {
    templateUrl: 'text.html',
    controller: 'TextCtrl',
    reloadOnSearch: false,
    loginRequired: false,
    resolve: {
      'data': loadText,
      'metadata': loadMetadata,
      'pages': loadPagesQuery
    }
  });

  $routeProvider.otherwise({
    redirectTo: '/search',
    loginRequired: false
  });

  $locationProvider.html5Mode(false);
}]);

'use strict';

var myApp = angular.module('myApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  $routeProvider.
    when('/view1', {
      templateUrl: '/partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: '/partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/ad', {
      templateUrl: '/partials/list',
      controller: 'adController'
    }).
    when('/ad/create', {
      templateUrl: '/partials/create',
      controller: 'adController'
    }).
    when('/ad/:id', {
      templateUrl: '/partials/get',
      controller: 'adGetController'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
  
}]);

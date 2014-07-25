'use strict';

var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });
}]);

myAppControllers.controller('adController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    
  $http({
      method: 'GET',
      url: '/api/ads'
    }).
    success(function (data, status, headers, config) {
      $scope.anuncios = data;
    }).
    error(function (data, status, headers, config) {
      $scope.anuncios = 'Error!';
    });

    $scope.cadastrar = function(form){
      var url = '/api/ads';
      var dados = form;
      $http({
        method: 'POST',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        $scope.msg = data;
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!';
      });
   }
  
}]);

myAppControllers.controller('adGetController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    
  var id = $routeParams.id;   

    var url = '/api/ads/'+id;
    $http({
      method: 'GET',
      url: url
    }).
    success(function (data, status, headers, config) {
      $scope.anuncio = data;
    }).
    error(function (data, status, headers, config) {
      $scope.anuncio = 'Error!';
    });

    $scope.alterar = function(anuncio){
      var url = '/api/ads/'+anuncio._id;
      var dados = {
        name: anuncio.name,
        value: anuncio.value,
        category: anuncio.category,
        description: anuncio.description,
      };

      $http({
        method: 'PUT',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        var msg = 'Anuncio alterado';
        $scope.msg = msg;
      }).
      error(function (data, status, headers, config) {
        var msg = 'Error! anuncio não alterado';
        $scope.anuncio = msg;
      });
    }

    $scope.deletar = function(anuncio){
      var url = '/api/ads/'+anuncio._id;
      $http({
        method: 'DELETE',
        url: url
      }).
      success(function (data, status, headers, config) {
        var msg = 'Anuncio deletado';
        $scope.msg = msg;
      }).
      error(function (data, status, headers, config) {
        var msg = 'Error! Auncio não deletado';
        $scope.anuncio = msg;
      });
    }
  
}]);

myAppControllers.controller('MyCtrl1', ['$scope', function($scope){

}]);

myAppControllers.controller('MyCtrl2', ['$scope', function($scope){

}]);

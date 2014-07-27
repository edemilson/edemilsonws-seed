'use strict';

var myAppControllers = angular.module('myApp.controllers', ['autofields']);

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
  
    $scope.novoanuncio = {
      name: '',
      value: null,
      category: null,
      description: ''
    };

	$scope.schema = [
    { property: 'name', label: 'Titulo:', type: 'text', attr: { ngMinlength: 4, required: true }, msgs: {minlength: 'É preciso ter mais de 4 Caracters'} },
    { property: 'value', label:'Qual o valor:', type: 'number', attr: {min:1}, msgs: {min: 'Não pode ser menor que 1'} },
    { property: 'category', label: 'Categoria:', type: 'select', list: 'key as value for (key,value) in categorys', attr: {required: true}},
    { property: 'description', label: 'Descrição:', type: 'textarea', rows: 5, placeholder: 'Fale sobre o que está vendendo'}
	];

	$scope.options = {
		validation: {
			enabled: true
		},
		layout: {
			type: 'basic',
			labelSize: 3,
			inputSize: 9
		}
	};

	$scope.categorys = {
		0: 'Venda',
		1: 'Aluguel',
    2: 'Temporada'
	};

	$scope.join = function(){
		if(!$scope.joinForm.$valid) return;
		//join stuff....
    var url = '/api/ads';
    var dados = $scope.novoanuncio;
    $http({
      method: 'POST',
      url: url,
      data: dados
    }).
    success(function (data, status, headers, config) {
      $scope.msg = 'Registro adicionado com sucesso!';
    }).
    error(function (data, status, headers, config) {
      $scope.msg = 'Error!';
    });
	}
  
  $scope.deletar = function(anuncio){
      var url = '/api/ads/'+anuncio._id;
      $http({
        method: 'DELETE',
        url: url
      }).
      success(function (data, status, headers, config) {
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
      }).
      error(function (data, status, headers, config) {
        var msg = 'Error! Auncio não deletado';
        $scope.anuncio = msg;
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
  
    $scope.schema = [
      { property: 'name', label: 'Titulo:', type: 'text', attr: { ngMinlength: 4, required: true }, msgs: {minlength: 'É preciso ter mais de 4 Caracters'} },
      { property: 'value', label:'Qual o valor:', type: 'number', attr: {min:1}, msgs: {min: 'Não pode ser menor que 1'} },
      { property: 'category', label: 'Categoria:', type: 'select', list: 'key as value for (key,value) in categorys', attr: {required: true}},
      { property: 'description', label: 'Descrição:', type: 'textarea', rows: 5, placeholder: 'Fale sobre o que está vendendo'}
    ];

    $scope.options = {
      validation: {
        enabled: true
      },
      layout: {
        type: 'basic',
        labelSize: 3,
        inputSize: 9
      }
    };

    $scope.categorys = {
      0: 'Venda',
      1: 'Aluguel',
      2: 'Temporada'
    };

    $scope.join = function(){
      if(!$scope.joinForm.$valid) return;
      var url = '/api/ads/'+$scope.anuncio._id;
      var dados = {
        name: $scope.anuncio.name,
        value: $scope.anuncio.value,
        category: $scope.anuncio.category,
        description: $scope.anuncio.description,
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

}]);

myAppControllers.controller('MyCtrl1', ['$scope', function($scope){

}]);

myAppControllers.controller('MyCtrl2', ['$scope', function($scope){

}]);

'use strict';

var myAppDirective = angular.module('myApp.directives', []);

myAppDirective.directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);

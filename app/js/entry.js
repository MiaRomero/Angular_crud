const angular = require('angular');
const ohMyApp = angular.module('ohMyApp', []);
const baseUrl = 'http://localhost:3000';

var errorHandler = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

ohMyApp.controller('LionsController', ['$http', function($http) {
  this.lions = ['Alex', 'Simba'];
  this.getAll = () => {
    this.lions.push('testLion');
  };
}]);

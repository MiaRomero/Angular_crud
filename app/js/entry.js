const angular = require('angular');
const ohMyApp = angular.module('ohMyApp', []);
const baseUrl = 'http://localhost:3000';

var errorHandler = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

ohMyApp.controller('LionsController', ['$http', function($http) {
  this.lions = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/lions')
    .then((res) => {
      this.lions = res.data;
    }, errorHandler.bind(this));
  };

  this.createLion = () => {
    $http.post(baseUrl + '/api/lions')
    .then((res) => {
      this.lions.push(res.data);
      this.newLion = null;
    }, errorHandler.bind(this));
  };
}]);

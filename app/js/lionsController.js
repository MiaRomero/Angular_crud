const angular = require('angular');
const ohMyApp = angular.module('ohMyApp', []);
const baseUrl = 'http://localhost:3000';
const errorHandler = require(__dirname + '/appErrorHandler');


ohMyApp.controller('LionsController', ['$http', function($http) {
  this.lions = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/lions')
    .then((res) => {
      this.lions = res.data;
    }, errorHandler.bind(this));
  };

  this.describe = (lion) => {
    return lion.name + ' is a ' + lion.variety + ' lion from ' + lion.location
     + ' in ' + lion.continent + '. His nemesis is ' + lion.nemesis;
  };

  this.createLion = () => {
    $http.post(baseUrl + '/api/lions', this.newLion)
    .then((res) => {
      this.lions.push(res.data);
      this.newLion = null;
    }, errorHandler.bind(this));
  };

  this.updateLion = (lion) => {
    $http.put(baseUrl + '/api/lions/' + lion._id, lion)
    .then(() => {
      lion.editing = false;
    }, errorHandler.bind(this));
  };

  this.removeLion = (lion) => {
    $http.delete(baseUrl + '/api/lions/' + lion._id)
    .then(() => {
      this.lions.splice(this.lions.indexOf(lion), 1);
    }, errorHandler.bind(this));
  };
}]);

const angular = require('angular');
const ohMyApp = require(__dirname + '/../ohMyApp');
const baseUrl = 'http://localhost:3000';
const errorHandler = require(__dirname + '/../appErrorHandler');

ohMyApp.controller('TigersController', ['$http', function($http) {
  this.tigers = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/tigers')
    .then((res) => {
      this.tigers = res.data;
    }, errorHandler.bind(this));
  };

  this.describe = (tiger) => {
    return tiger.name + ' is a ' + tiger.variety + ' tiger from ' + tiger.location
     + ' in ' + tiger.continent + '. His nemesis is ' + tiger.nemesis;
  };

  this.createTiger = () => {
    $http.post(baseUrl + '/api/tigers', this.newTiger)
    .then((res) => {
      this.tigers.push(res.data);
      this.newTiger = null;
    }, errorHandler.bind(this));
  };

  this.saveCurrentTiger = (tiger) => {
    this.stashedTiger = angular.copy(tiger);
  };

  this.usedStashedTiger = (tiger) => {
    var index = this.tigers.indexOf(tiger);
    this.tigers[index] = this.stashedTiger;
  };

  this.updateTiger = (tiger) => {
    $http.put(baseUrl + '/api/tigers/' + tiger._id, tiger)
    .then(() => {
      tiger.editing = false;
    }, errorHandler.bind(this));
  };

  this.removeTiger = (tiger) => {
    $http.delete(baseUrl + '/api/tigers/' + tiger._id)
    .then(() => {
      this.tigers.splice(this.tigers.indexOf(tiger), 1);
    }, errorHandler.bind(this));
  };
}]);

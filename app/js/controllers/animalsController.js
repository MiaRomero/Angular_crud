const angular = require('angular');
const ohMyApp = require(__dirname + '/../ohMyApp');
const baseUrl = 'http://localhost:3000';
const errorHandler = require(__dirname + '/../appErrorHandler');

ohMyApp.controller('AnimalsController', ['$http', function($http) {
  this.animals = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/' + this.species + 's')
    .then((res) => {
      this.animals = res.data;
    }, errorHandler.bind(this));
  };

  this.describe = (animal) => {
    return animal.name + ' is a ' + animal.variety + ' animal from ' + animal.location
     + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
  };

  this.createAnimal = () => {
    $http.post(baseUrl + '/api/' + this.species + 's', this.newAnimal)
    .then((res) => {
      this.animals.push(res.data);
      this.newAnimal = null;
    }, errorHandler.bind(this));
  };

  this.saveCurrentAnimal = (animal) => {
    this.stashedAnimal = angular.copy(animal);
  };

  this.usedStashedAnimal = (animal) => {
    var index = this.animals.indexOf(animal);
    this.animals[index] = this.stashedAnimal;
  };

  this.updateAnimal = (animal) => {
    $http.put(baseUrl + '/api/' + this.species + 's/' + animal._id, animal)
    .then(() => {
      animal.editing = false;
    }, errorHandler.bind(this));
  };

  this.removeAnimal = (animal) => {
    $http.delete(baseUrl + '/api/' + this.species + 's/' + animal._id)
    .then(() => {
      this.animals.splice(this.animals.indexOf(animal), 1);
    }, errorHandler.bind(this));
  };
}]);

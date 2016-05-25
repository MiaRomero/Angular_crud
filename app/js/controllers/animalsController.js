const angular = require('angular');
const ohMyApp = require(__dirname + '/../ohMyApp');
const baseUrl = 'http://localhost:3000';

ohMyApp.controller('AnimalsController', ['$http',
'appErrorHandler', function($http, appErrorHandler) {
  this.animals = [];
  this.errors = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/' + this.species + 's')
    .then((res) => {
      this.animals = res.data;
    }, appErrorHandler(this.errors, 'could not get ' + this.species + 's')
    .bind(this));
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
    }, appErrorHandler(this.errors, 'could not create ' + this.species)
    .bind(this));
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
    }, appErrorHandler(this.errors, 'could not update ' + this.species)
    .bind(this));
  };

  this.removeAnimal = (animal) => {
    $http.delete(baseUrl + '/api/' + this.species + 's/' + animal._id)
    .then(() => {
      this.animals.splice(this.animals.indexOf(animal), 1);
    }, appErrorHandler(this.errors, 'could not remove ' + this.species)
    .bind(this));
  };
}]);

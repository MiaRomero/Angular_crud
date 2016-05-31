const angular = require('angular');
const ohMyApp = require(__dirname + '/../ohMyApp');

ohMyApp.controller('AnimalsController', ['animalResource', function(Resource) {
  this.animals = [];
  this.errors = [];
  var resource = new Resource(this.animals, this.errors, '/api/' + this.species + 's');

  this.getAll = resource.getAll.bind(resource);

  this.createAnimal = function() {
    resource.create(this.newAnimal)
      .then( () => {
        this.newAnimal = null;
      });
  }.bind(this);

  this.updateAnimal = function(animal) {
    resource.update(animal)
    .then( () => {
      animal.editing = false;
    });
  };

  this.removeAnimal = resource.remove.bind(resource);

  this.describe = function(animal) {
    return animal.name + ' is a ' + animal.variety + ' animal from ' + animal.location
     + ' in ' + animal.continent + '. His nemesis is ' + animal.nemesis;
  };

  this.saveCurrentAnimal = function(animal) {
    this.stashedAnimal = angular.copy(animal);
  };

  this.usedStashedAnimal = function(animal) {
    var index = this.animals.indexOf(animal);
    this.animals[index] = this.stashedAnimal;
  };
}]);

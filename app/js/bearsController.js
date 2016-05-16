const ohMyApp = require(__dirname + '/ohMyApp');
const baseUrl = 'http://localhost:3000';
const errorHandler = require(__dirname + '/appErrorHandler');

ohMyApp.controller('BearsController', ['$http', function($http) {
  this.bears = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/bears')
    .then((res) => {
      this.bears = res.data;
    }, errorHandler.bind(this));
  };

  this.describe = (bear) => {
    return bear.name + ' is a ' + bear.variety + ' bear from ' + bear.location
     + ' in ' + bear.continent + '. His nemesis is ' + bear.nemesis;
  };

  this.createBear = () => {
    $http.post(baseUrl + '/api/bears', this.newBear)
    .then((res) => {
      this.bears.push(res.data);
      this.newBear = null;
    }, errorHandler.bind(this));
  };

  this.updateBear = (bear) => {
    $http.put(baseUrl + '/api/bears/' + bear._id, bear)
    .then(() => {
      bear.editing = false;
    }, errorHandler.bind(this));
  };

  this.removeBear = (bear) => {
    $http.delete(baseUrl + '/api/bears/' + bear._id)
    .then(() => {
      this.bears.splice(this.bears.indexOf(bear), 1);
    }, errorHandler.bind(this));
  };
}]);

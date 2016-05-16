const ohMyApp = require(__dirname + '/../ohMyApp');
const baseUrl = 'http://localhost:3000';
const errorHandler = require(__dirname + '/../appErrorHandler');

ohMyApp.controller('OhMyController', ['$http', function($http) {
  this.totalsText = '';
  this.friendsText = '';

  this.getTotals = () => {
    $http.get(baseUrl + '/api/ohMy')
    .then((res) => {
      this.totalsText = res.data;
    }, errorHandler.bind(this));
  };

  this.getFriends = () => {
    $http.get(baseUrl + '/api/ohMy/' + this.continent)
    .then((res) => {
      this.friendsText = res.data;
    }, errorHandler.bind(this));
  };

}]);

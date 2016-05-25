const ohMyApp = require(__dirname + '/../ohMyApp');
const baseUrl = 'http://localhost:3000';

ohMyApp.controller('OhMyController', ['$http', 'appErrorHandler',
function($http, appErrorHandler) {
  this.totalsText = '';
  this.friendsText = '';
  this.errors = [];

  this.getTotals = () => {
    $http.get(baseUrl + '/api/ohMy')
    .then((res) => {
      this.totalsText = res.data;
    }, appErrorHandler(this.errors, 'could not get animal totals')
    .bind(this));
  };

  this.getFriends = () => {
    $http.get(baseUrl + '/api/ohMy/' + this.continent)
    .then((res) => {
      this.friendsText = res.data;
    }, appErrorHandler(this.errors, 'could not get friends from ' + this.continent)
    .bind(this));
  };
}]);

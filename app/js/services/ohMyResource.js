module.exports = exports = function(app) {
  app.factory('ohMyResource', ['$http', 'appErrorHandler', function($http, errorHandler) {

    var Resource = function(totals, friends, continent, errorsArray) {
      this.url = 'http://localhost:3000/api/ohMy';
      this.totals = totals;
      this.friends = friends;
      this.continent = continent;
      this.errors = errorsArray;
    };

    Resource.prototype.getTotals = function() {
      return $http.get(this.url)
      .then( (res) => {
        this.totals.text = res.data;
      }, errorHandler(this.errors, 'could not get animal totals'));
    };

    Resource.prototype.getFriends = function() {
      return $http.get(this.url + '/' + this.continent.name)
      .then( (res) => {
        this.friends.text = res.data;
      }, errorHandler(this.errors, 'could not get animal friends'));
    };
    return Resource;
  }]);
};

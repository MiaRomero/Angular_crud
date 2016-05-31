module.exports = exports = function(app) {
  app.factory('httpResource', ['$http', 'appErrorHandler', function($http, errorHandler) {
    const baseUrl = 'http://localhost:3000';
    var Resource = function(resourceArray, errorsArray, apiUrl) {
      this.data = resourceArray;
      this.errors = errorsArray;
      this.url = baseUrl + apiUrl;
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
      .then( (res => {
        this.data.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.data.push(res.data[i]);
        }
      }, errorHandler(this.errors, 'could not retrieve animals')));
    };

    Resource.prototype.create = function(animal) {
      return $http.post(this.url, animal)
      .then( (res) => {
        this.data.push(res.data);
      }, errorHandler(this.errors, 'could not create animal'));
    };

    Resource.prototype.update = function(animal) {
      return $http.put(this.url + '/' + animal._id, animal)
      .catch(errorHandler(this.errors, 'could not update animal'));
    };

    Resource.prototype.remove = function(animal) {
      return $http.delete(this.url + '/' + animal._id)
      .then( () => {
        this.data.splice(this.data.indexof(animal), 1);
      }, errorHandler(this.errors, 'could not remove animal'));
    };
    return Resource;
  }]);
};

const ohMyApp = require(__dirname + '/../ohMyApp');

ohMyApp.controller('OhMyController', ['ohMyResource', function(Resource) {
  this.totals = { text: '' };
  this.friends = { text: '' };
  this.continent = { name: '' };
  this.errors = [];

  var resource = new Resource(this.totals, this.friends, this.continent, this.errors);

  this.getTotals = resource.getTotals.bind(resource);

  this.getFriends = resource.getFriends.bind(resource);
}]);

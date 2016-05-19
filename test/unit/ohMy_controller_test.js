/* eslint-env karma */
// no arrow functions!
const angular = require('angular');
require('angular-mocks');
const apiUrl = 'http://localhost:3000';

describe('ohMy controller REST functionality', function() {
  var $httpBackend;
  var $controller;
  var ohMyCtrl;

  beforeEach(angular.mock.module('ohMyApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$controller_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));
  beforeEach(angular.mock.inject(function() {
    ohMyCtrl = $controller('OhMyController');
  }));
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('the getTotals function should return a string with number of each animal', function() {
    var responseText = 'There are more bears than lions and tigers! Oh my! \n There are 5 bears,' +
    ' 3 lions, and 2 tigers.';
    $httpBackend.expectGET(apiUrl + '/api/ohMy')
    .respond(200, responseText);
    ohMyCtrl.getTotals();
    $httpBackend.flush();
    expect(ohMyCtrl.totalsText).toEqual(responseText);
  });

  it('the getFriends function should return all anminals on given continent', function() {
    ohMyCtrl.continent = 'North America';
    var responseText = 'Lions, tigers, and bears are friends, but they can\'t cross oceans. They ' +
    'can only be friends with others on their continent. The friends in North America are: ' +
    'yogi bear, fonzy bear.';
    $httpBackend.expectGET(apiUrl + '/api/ohMy/' + ohMyCtrl.continent)
    .respond(200, responseText);
    ohMyCtrl.getFriends();
    $httpBackend.flush();
    expect(ohMyCtrl.friendsText).toEqual(responseText);
  });
});

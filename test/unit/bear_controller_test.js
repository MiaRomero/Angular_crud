/* eslint-env karma */
// no arrow functions!
const angular = require('angular');
require('angular-mocks');
const apiUrl = 'http://localhost:3000';

describe('bears controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('ohMyApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$controller_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  describe('REST functionality', function() {
    var bearsCtrl;

    beforeEach(angular.mock.inject(function() {
      bearsCtrl = $controller('BearsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('the getAll function should send a GET request to retrieve all Bears', function() {
      $httpBackend.expectGET(apiUrl + '/api/bears')
      .respond(200, [{ name: 'testBear' }]);
      bearsCtrl.getAll();
      $httpBackend.flush();
      expect(bearsCtrl.bears.length).toBe(1);
      expect(bearsCtrl.bears[0].name).toBe('testBear');
    });

    it('the createBear function should send a POST request to add a bear', function() {
      $httpBackend.expectPOST(apiUrl + '/api/bears', { name: 'newBear' })
      .respond(200, { name: 'existingBear' });
      expect(bearsCtrl.bears.length).toBe(0);
      bearsCtrl.newBear = { name: 'newBear' };
      bearsCtrl.createBear();
      $httpBackend.flush();
      expect(bearsCtrl.bears[0].name).toBe('existingBear');
      expect(bearsCtrl.newBear).toBe(null);
    });

    it('the updateBear function should send a PUT request to update a bear', function() {
      $httpBackend.expectPUT(apiUrl + '/api/bears/2', { name: 'editedBear', editing: true, _id: 2 })
      .respond(200);
      bearsCtrl.bears = [{ name: 'originalBear', editing: true, _id: 2 }];
      bearsCtrl.bears[0].name = 'editedBear';
      bearsCtrl.updateBear(bearsCtrl.bears[0]);
      $httpBackend.flush();
      expect(bearsCtrl.bears[0].editing).toBe(false);
    });
  });

  describe('bears controller misc functions', function() {
    var bearsCtrl;

    beforeEach(angular.mock.inject(function() {
      bearsCtrl = $controller('BearsController');
    }));

    it('the describe functions should output a string describing the bear', function() {
      bearsCtrl.bears[0] = { name: 'testBear', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      expect(bearsCtrl.describe(bearsCtrl.bears[0])).toEqual('testBear is a testy bear from testLand' +
        ' in South America. His nemesis is rain');
    });

    it('the saveCurrentBear function should save a copy of a bear', function() {
      bearsCtrl.bears[0] = { name: 'testBear', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      bearsCtrl.saveCurrentBear(bearsCtrl.bears[0]);
      expect(bearsCtrl.stashedBear).toEqual(bearsCtrl.bears[0]);
    });

    it('the usedStashedBear function should reassign the saved bear to the bears array', function() {
      bearsCtrl.bears = [{ name: 'testBear', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' }, { name: 'testBear2', variety: 'brown',
      location: 'here', continent: 'SA', nemesis: 'tests' }];
      bearsCtrl.saveCurrentBear(bearsCtrl.bears[1]);
      bearsCtrl.bears[1] = { name: 'newName', variety: 'brown', location: 'here', continent: 'SA',
      nemesis: 'tests' };
      bearsCtrl.usedStashedBear(bearsCtrl.bears[1]);
      expect(bearsCtrl.bears[1]).toEqual({ name: 'testBear2', variety: 'brown', location: 'here',
      continent: 'SA', nemesis: 'tests' });
    });
  });
});

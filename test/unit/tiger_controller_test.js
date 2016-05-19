/* eslint-env karma */
// no arrow functions!
const angular = require('angular');
require('angular-mocks');
const apiUrl = 'http://localhost:3000';

describe('tigers controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('ohMyApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$controller_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  describe('REST functionality', function() {
    var tigersCtrl;

    beforeEach(angular.mock.inject(function() {
      tigersCtrl = $controller('TigersController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('the getAll function should send a GET request to retrieve all Tigers', function() {
      $httpBackend.expectGET(apiUrl + '/api/tigers')
      .respond(200, [{ name: 'testTiger' }]);
      tigersCtrl.getAll();
      $httpBackend.flush();
      expect(tigersCtrl.tigers.length).toBe(1);
      expect(tigersCtrl.tigers[0].name).toBe('testTiger');
    });

    it('the createTiger function should send a POST request to add a tiger', function() {
      $httpBackend.expectPOST(apiUrl + '/api/tigers', { name: 'newTiger' })
      .respond(200, { name: 'existingTiger' });
      expect(tigersCtrl.tigers.length).toBe(0);
      tigersCtrl.newTiger = { name: 'newTiger' };
      tigersCtrl.createTiger();
      $httpBackend.flush();
      expect(tigersCtrl.tigers[0].name).toBe('existingTiger');
      expect(tigersCtrl.newTiger).toBe(null);
    });

    it('the updateTiger function should send a PUT request to update a tiger', function() {
      $httpBackend.expectPUT(apiUrl + '/api/tigers/2', { name: 'editedTiger', editing: true, _id: 2 })
      .respond(200);
      tigersCtrl.tigers = [{ name: 'originalTiger', editing: true, _id: 2 }];
      tigersCtrl.tigers[0].name = 'editedTiger';
      tigersCtrl.updateTiger(tigersCtrl.tigers[0]);
      $httpBackend.flush();
      expect(tigersCtrl.tigers[0].editing).toBe(false);
    });
  });

  describe('tigers controller misc functions', function() {
    var tigersCtrl;

    beforeEach(angular.mock.inject(function() {
      tigersCtrl = $controller('TigersController');
    }));

    it('the describe functions should output a string describing the tiger', function() {
      tigersCtrl.tigers[0] = { name: 'testTiger', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      expect(tigersCtrl.describe(tigersCtrl.tigers[0])).toEqual('testTiger is a testy tiger from testLand' +
        ' in South America. His nemesis is rain');
    });

    it('the saveCurrentTiger function should save a copy of a tiger', function() {
      tigersCtrl.tigers[0] = { name: 'testTiger', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      tigersCtrl.saveCurrentTiger(tigersCtrl.tigers[0]);
      expect(tigersCtrl.stashedTiger).toEqual(tigersCtrl.tigers[0]);
    });

    it('the usedStashedTiger function should reassign the saved tiger to the tigers array', function() {
      tigersCtrl.tigers = [{ name: 'testTiger', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' }, { name: 'testTiger2', variety: 'brown',
      location: 'here', continent: 'SA', nemesis: 'tests' }];
      tigersCtrl.saveCurrentTiger(tigersCtrl.tigers[1]);
      tigersCtrl.tigers[1] = { name: 'newName', variety: 'brown', location: 'here', continent: 'SA',
      nemesis: 'tests' };
      tigersCtrl.usedStashedTiger(tigersCtrl.tigers[1]);
      expect(tigersCtrl.tigers[1]).toEqual({ name: 'testTiger2', variety: 'brown', location: 'here',
      continent: 'SA', nemesis: 'tests' });
    });
  });
});

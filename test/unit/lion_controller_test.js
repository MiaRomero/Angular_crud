/* eslint-env karma */
// no arrow functions!
const angular = require('angular');
require('angular-mocks');
const apiUrl = 'http://localhost:3000';

describe('lions controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('ohMyApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$controller_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  describe('REST functionality', function() {
    var lionsCtrl;

    beforeEach(angular.mock.inject(function() {
      lionsCtrl = $controller('LionsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('the getAll function should send a GET request to retrieve all Lions', function() {
      $httpBackend.expectGET(apiUrl + '/api/lions')
      .respond(200, [{ name: 'testLion' }]);
      lionsCtrl.getAll();
      $httpBackend.flush();
      expect(lionsCtrl.lions.length).toBe(1);
      expect(lionsCtrl.lions[0].name).toBe('testLion');
    });

    it('the createLion function should send a POST request to add a lion', function() {
      $httpBackend.expectPOST(apiUrl + '/api/lions', { name: 'newLion' })
      .respond(200, { name: 'existingLion' });
      expect(lionsCtrl.lions.length).toBe(0);
      lionsCtrl.newLion = { name: 'newLion' };
      lionsCtrl.createLion();
      $httpBackend.flush();
      expect(lionsCtrl.lions[0].name).toBe('existingLion');
      expect(lionsCtrl.newLion).toBe(null);
    });

    it('the updateLion function should send a PUT request to update a lion', function() {
      $httpBackend.expectPUT(apiUrl + '/api/lions/2', { name: 'editedLion', editing: true, _id: 2 })
      .respond(200);
      lionsCtrl.lions = [{ name: 'originalLion', editing: true, _id: 2 }];
      lionsCtrl.lions[0].name = 'editedLion';
      lionsCtrl.updateLion(lionsCtrl.lions[0]);
      $httpBackend.flush();
      expect(lionsCtrl.lions[0].editing).toBe(false);
    });
  });

  describe('lions controller misc functions', function() {
    var lionsCtrl;

    beforeEach(angular.mock.inject(function() {
      lionsCtrl = $controller('LionsController');
    }));

    it('the describe functions should output a string describing the lion', function() {
      lionsCtrl.lions[0] = { name: 'testLion', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      expect(lionsCtrl.describe(lionsCtrl.lions[0])).toEqual('testLion is an testy lion from testLand' +
        ' in South America. His nemesis is rain');
    });

    it('the saveCurrentLion function should save a copy of a lion', function() {
      lionsCtrl.lions[0] = { name: 'testLion', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' };
      lionsCtrl.saveCurrentLion(lionsCtrl.lions[0]);
      expect(lionsCtrl.stashedLion).toEqual(lionsCtrl.lions[0]);
    });

    it('the usedStashedLion function should reassign the saved lion to the lions array', function() {
      lionsCtrl.lions = [{ name: 'testLion', variety: 'testy', location: 'testLand',
      continent: 'South America', nemesis: 'rain' }, { name: 'testLion2', variety: 'brown',
      location: 'here', continent: 'SA', nemesis: 'tests' }];
      lionsCtrl.saveCurrentLion(lionsCtrl.lions[1]);
      lionsCtrl.lions[1] = { name: 'newName', variety: 'brown', location: 'here', continent: 'SA',
      nemesis: 'tests' };
      lionsCtrl.usedStashedLion(lionsCtrl.lions[1]);
      expect(lionsCtrl.lions[1]).toEqual({ name: 'testLion2', variety: 'brown', location: 'here',
      continent: 'SA', nemesis: 'tests' });
    });
  });
});

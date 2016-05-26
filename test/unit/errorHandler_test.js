const angular = require('angular');
require('angular-mocks');
require('../../app/js/entry');

describe('appErrorHandler service', function() {
  beforeEach(angular.mock.module('ohMyApp'));

  it('should return a function', angular.mock.inject(function(appErrorHandler) {
    expect(typeof appErrorHandler).toBe('function');
  }));

  it('should add an error to errorsArray', angular.mock.inject(function(appErrorHandler) {
    var testArray = [];
    appErrorHandler(testArray, 'test message')();
    expect(testArray.length).toBe(1);
    expect(testArray[0] instanceof Error).toBe(true);
    expect(testArray[0].message).toBe('test message');
  }));
});

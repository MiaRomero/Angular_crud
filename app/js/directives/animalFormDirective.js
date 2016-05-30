module.exports = exports = function(app) {
  app.directive('myAnimalForm', () => {
    return {
      restrict: 'EAC',
      controller: 'AnimalsController',
      controllerAs: 'animalCtrl',
      bindToController: {
        species: '@'
      },
      templateUrl: '/templates/animalFormTemplate.html',
      transclude: true,
      scope: {}
    };
  });
};

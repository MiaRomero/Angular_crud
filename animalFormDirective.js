module.exports = exports = function(app) {
  app.directive('myAnimalForm', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      templateUrl: '/templates/animalFormTemplate.html',
      transclude: true,
      scope: {
        animal: '='
      }
    };
  });
};

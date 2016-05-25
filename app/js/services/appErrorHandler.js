module.exports = exports = function(app) {
  app.factory('appErrorHandler', function() {
    return function(errorsArray, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errorsArray)) {
          errorsArray.push(new Error(message || 'serverError'));
        }
      };
    };
  });
};
